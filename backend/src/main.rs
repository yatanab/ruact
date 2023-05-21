mod handler;
mod model;

use std::env;

use actix_cors::Cors;
use actix_web::{get, App, HttpResponse, HttpServer, Responder, web};
use sqlx::{postgres::PgPoolOptions, PgPool};
use sqlx_core::postgres::PgConnectOptions;
use crate::model::{User};
use dotenv::dotenv;

mod structure;

pub use structure::*;

pub struct AppState {
    db: PgPool,
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


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    dotenv().ok();

    let database_host = env::var("DATABASE_HOST").expect("DATABASE_HOST must be set");
    let database_username = env::var("DATABASE_USERNAME").expect("DATABASE_USERNAME must be set");
    let database_password = env::var("DATABASE_PASSWORD").expect("DATABASE_PASSWORD must be set");
    let database_name = env::var("DATABASE_NAME").expect("DATABASE_NAME must be set");

    let option = PgConnectOptions::new()
        .host(&database_host)
        .username(&database_username)
        .password(&database_password)
        .database(&database_name);

    // Create a connection pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect_with(option)
        .await
        .expect("Unable to connect to Postgres", );

    println!("🚀 Server started successfully");


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
            .service(haikus)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await

}
