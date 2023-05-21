use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, sqlx::FromRow)]
pub struct User {
    pub id: i32,
    pub user_id: String,
    pub name: String,
}

#[derive(Deserialize, Serialize, sqlx::FromRow)]
pub struct Haiku {
    pub user_id: String,
    pub season: i32,
    pub kami_no_ku: String,
    pub naka_no_ku: String,
    pub shimo_no_ku: String,
}