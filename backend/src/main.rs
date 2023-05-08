use actix_cors::Cors;
use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct TestObj {
    str: String,
    num: isize,
    arr: Vec::<isize>,
}

#[get("/test")]
async fn test() -> impl Responder {
    HttpResponse::Ok().json(TestObj {
        str: "テスト２".to_string(),
        num: 100,
        arr: vec![1, 2, 3],
    })
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
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
