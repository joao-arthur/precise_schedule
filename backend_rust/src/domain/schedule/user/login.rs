use super::User;
use crate::domain::database::DBErr;
use crate::domain::generator::{DateGen, IdGen};

pub trait UserLoginService {
    fn login(&self) -> Result<(), ()>;
}
