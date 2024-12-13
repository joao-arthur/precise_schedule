use crate::domain::{
    database::DBErr,
    generator::{DateGen, IdGen}
};

pub struct UserUniqueInfo {
    pub email: String,
    pub username: String,
}

#[derive(Debug, PartialEq)]
pub struct UsernameAlreadyRegisteredErr;

#[derive(Debug, PartialEq)]
pub struct EmailAlreadyRegisteredErr;

#[derive(PartialEq, Debug)]
pub enum UserUniqueInfoErr {
    DBErr(DBErr),
    UsernameAlreadyRegisteredErr(UsernameAlreadyRegisteredErr),
    EmailAlreadyRegisteredErr(EmailAlreadyRegisteredErr)
}

pub trait UserUniqueInfoRepo {
    fn count_username(&self, username: &String) -> Result<u64, DBErr>;
    fn count_email(&self, email: &String) -> Result<u64, DBErr>;
}

fn user_c_unique_info_is_valid(repo: &dyn UserUniqueInfoRepo, user: &UserUniqueInfo) -> Result<(), UserUniqueInfoErr> {
    let username_count = repo.count_username(&user.username).map_err(|err| UserUniqueInfoErr::DBErr(err))?;
    if username_count > 0 {
        return Err(UserUniqueInfoErr::UsernameAlreadyRegisteredErr(UsernameAlreadyRegisteredErr));
    }
    let email_count = repo.count_email(&user.email).map_err(|err| UserUniqueInfoErr::DBErr(err))?;
    if email_count > 0 {
        return Err(UserUniqueInfoErr::EmailAlreadyRegisteredErr(EmailAlreadyRegisteredErr));
    }
    Ok(())
}

fn user_u_unique_info_is_valid(
    repo: &dyn UserUniqueInfoRepo,
    user: &UserUniqueInfo,
    old_user: &UserUniqueInfo,
) -> Result<(), UserUniqueInfoErr> {
    if user.username != old_user.username {
        let username_count = repo.count_username(&user.username).map_err(|err| UserUniqueInfoErr::DBErr(err))?;
        if username_count > 0 {
            return Err(UserUniqueInfoErr::UsernameAlreadyRegisteredErr(UsernameAlreadyRegisteredErr));
        }
    }
    if user.email != old_user.email {
        let email_count = repo.count_email(&user.email).map_err(|err| UserUniqueInfoErr::DBErr(err))?;
        if email_count > 0 {
            return Err(UserUniqueInfoErr::EmailAlreadyRegisteredErr(EmailAlreadyRegisteredErr));
        }
    }
    Ok(())
}

mod test {
    
}