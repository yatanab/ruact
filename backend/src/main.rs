use actix_cors::Cors;
use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;

mod structure;

pub use structure::*;

#[derive(Serialize)]
struct TestObj {
    str: String,
    num: isize,
    arr: Vec::<isize>,
}

#[get("/test")]
async fn test() -> impl Responder {
    HttpResponse::Ok().json(
        TestObj {
            str: "テスト２".to_string(),
            num: 100,
            arr: vec![1, 2, 3],
    })
}

#[get("/haiku")]
async fn haiku() -> impl Responder {
    HttpResponse::Ok().json(
            Haiku {
                kami_no_ku: "早起きの".to_string(),
                naka_no_ku: "辛さとともに".to_string(),
                shimo_no_ku: "冬のにおい".to_string(),
                auther: "yatanab".to_string(),
                description: "高校のとき".to_string(),
            })
}

#[get("/haikus")]
async fn haikus() -> impl Responder {
    HttpResponse::Ok().json(
        vec![
            Haiku {
                kami_no_ku: "早起きの".to_string(),
                naka_no_ku: "辛さとともに".to_string(),
                shimo_no_ku: "冬のにおい".to_string(),
                auther: "yatanab".to_string(),
                description: "高校のとき".to_string(),
            },
            Haiku {
                kami_no_ku: "早起きの".to_string(),
                naka_no_ku: "辛さとともに".to_string(),
                shimo_no_ku: "冬のにおい".to_string(),
                auther: "yatanab".to_string(),
                description: "高校のとき".to_string(),
            },
            Haiku {
                kami_no_ku: "早起きの".to_string(),
                naka_no_ku: "辛さとともに".to_string(),
                shimo_no_ku: "冬のにおい".to_string(),
                auther: "yatanab".to_string(),
                description: "高校のとき".to_string(),
            }
        ]
    )
}

#[get("/hey")]
async fn hey() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(
                Cors::default()
                .allowed_origin("http://localhost:8080")
                .allowed_origin("http://localhost:3000")
                .allow_any_method()
                .allow_any_header()
                .supports_credentials()
            )
            .service(hey)
            .service(test)
            .service(haiku)
            .service(haikus)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
