mod handler;
mod model;

use actix_cors::Cors;
use actix_web::{get, App, HttpResponse, HttpServer, Responder, web};
use sqlx::{postgres::PgPoolOptions, PgPool};
use crate::model::{User};

mod structure;

pub use structure::*;

pub struct AppState {
    db: PgPool,
}


#[get("/test")]
async fn test() -> impl Responder {
    HttpResponse::Ok().json(
        User {
            id: 10,
            user_id: "testID".to_string(),
            name: "test name".to_string(),
    })
}

#[get("/user")]
async fn user(
    data: web::Data<AppState>,
) -> impl Responder {
    HttpResponse::Ok().json(
        User {
            id: 10,
            user_id: "testID".to_string(),
            name: "test name".to_string(),
    })
}

#[get("/haikus")]
async fn haikus() -> impl Responder {
    let mut vec = vec![
        Haiku {
        kami_no_ku: "早起きの".to_string(),
        naka_no_ku: "辛さとともに".to_string(),
        shimo_no_ku: "冬のにおい".to_string(),
        auther: "yatanab".to_string(),
        description: "高校のとき".to_string(),
    }];

    for n in 1..101 {
        vec.push(
            Haiku{
                kami_no_ku: "早起きの".to_string(),
                naka_no_ku: "辛さとともに".to_string(),
                shimo_no_ku: "冬のにおい".to_string(),
                auther: n.to_string(),
                description: "高校のとき".to_string(),
            }
        )
    }

    HttpResponse::Ok().json(vec)
}

#[get("/hey")]
async fn hey() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    println!("🚀 Server started successfully");

    // Create a connection pool
    let pool = PgPoolOptions::new()
    .max_connections(5)
    .connect("postgres://postgres:postgres@localhost:5432/postgres").await.expect("Unable to connect to Postgres");


    HttpServer::new(move || {
                
        App::new()
            .wrap(
                Cors::default()
                .allowed_origin("http://localhost:8080")
                .allowed_origin("http://localhost:3000")
                .allow_any_method()
                .allow_any_header()
                .supports_credentials()
            )
            .app_data(web::Data::new(AppState { db: pool.clone() }))
            .configure(handler::config)
            .service(hey)
            .service(test)
            .service(haikus)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
