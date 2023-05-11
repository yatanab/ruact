use crate::{
  model::{User},
  AppState,
};
use actix_web::{get,web, HttpResponse, Responder};

pub fn config(conf: &mut web::ServiceConfig) {
  let scope = web::scope("/api")
      .service(user_list_handler);

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