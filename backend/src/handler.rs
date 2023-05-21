use crate::{
  model::{User, Haiku},
  AppState,
};
use actix_web::{get, web, HttpResponse, Responder, post};

pub fn config(conf: &mut web::ServiceConfig) {
  let scope = web::scope("/api")
      .service(user_list_handler)
      .service(post_haiku_handler);

  conf.service(scope);
}

#[get("/users")]
pub async fn user_list_handler(
    data: web::Data<AppState>,
) -> impl Responder {

    let users: Vec<User> = sqlx::query_as(
        "SELECT * FROM tbl_user "
    )
    .fetch_all(&data.db)
    .await
    .unwrap();

    HttpResponse::Ok().json(users)
}

#[post("/haiku")]
pub async fn post_haiku_handler(
    body: web::Json<Haiku>,
    data: web::Data<AppState>,
) -> impl Responder {
    let query_result = 
        sqlx::query(r#"INSERT INTO tbl_haiku (tbl_user_id, tbl_season_id, kami_no_ku, naka_no_ku, shimo_no_ku) VALUES (?, ?, ?, ?, ?)"#)
            .bind(body.user_id.to_string())
            .bind(body.season.to_string())
            .bind(body.kami_no_ku.to_string())
            .bind(body.naka_no_ku.to_string())
            .bind(body.shimo_no_ku.to_string())
            .execute(&data.db)
            .await
            .unwrap();
    
    HttpResponse::Ok()
}

#[get("/haikus")]
pub async fn get_haiku_list_handler(
    data: web::Data<AppState>,
) -> impl Responder {

    let haikus: Vec<Haiku> = sqlx::query_as(
        "SELECT * FROM tbl_haiku "
    )
    .fetch_all(&data.db)
    .await
    .unwrap();

    HttpResponse::Ok().json(haikus)
}

// login
// logout
