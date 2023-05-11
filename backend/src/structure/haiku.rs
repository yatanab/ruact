use serde::Serialize;

#[derive(Serialize)]
pub struct Haiku {
    pub kami_no_ku: String,
    pub naka_no_ku: String,
    pub shimo_no_ku: String,
    pub auther: String,
    pub description: String
}