use super::User;
use crate::domain::{
    database::DBErr,
    generator::{DateGen, IdGen},
};

pub trait UserDeleteService {}

pub trait UserDeleteRepo {
    fn delete(&self, id: &String) -> Result<(), DBErr>;
}
