use crate::database::{DBErr, DBOp};

use super::{
    model::User,
    repository::UserRepository,
    sign_in::UserCredentials,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
};

pub fn user_stub() -> User {
    User {
        id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
        email: "paul@gmail.com".into(),
        first_name: "Paul McCartney".into(),
        birthdate: "1942-06-18".into(),
        username: "paul_mc".into(),
        password: "asdf!@#123".into(),
        created_at: "2024-03-01T11:26Z".into(),
        updated_at: "2024-07-03T22:49Z".into(),
    }
}

pub struct UserRepositoryStub {
    err: bool,
    user: Option<User>,
    user_unique_count: UserUniqueInfoCount,
}

impl UserRepository for UserRepositoryStub {
    fn create(&self, _: &User) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn update(&self, _: &User) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn delete(&self, _: &str) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn read_by_id(&self, _: &str) -> DBOp<Option<User>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.user.clone())
    }

    fn read_by_credentials(&self, _: &UserCredentials) -> DBOp<Option<User>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.user.clone())
    }

    fn read_count_unique_info(&self, _: &UserUniqueInfo) -> DBOp<UserUniqueInfoCount> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.user_unique_count.clone())
    }
}

impl Default for UserRepositoryStub {
    fn default() -> Self {
        UserRepositoryStub { err: false, user: Some(user_stub()), user_unique_count: UserUniqueInfoCount { email: 0, username: 0 } }
    }
}

impl UserRepositoryStub {
    pub fn of_none() -> Self {
        UserRepositoryStub { user: None, ..Default::default() }
    }

    pub fn of_unique_info(user_unique_count: UserUniqueInfoCount) -> Self {
        UserRepositoryStub { user_unique_count, ..Default::default() }
    }

    pub fn of_db_err() -> Self {
        UserRepositoryStub { err: true, ..Default::default() }
    }
}

#[cfg(test)]
mod tests {
    use super::{UserRepositoryStub, user_stub};

    use crate::{
        database::DBErr,
        schedule::user::{
            repository::UserRepository,
            sign_in::stub::user_credentials_stub,
            unique_info::{UserUniqueInfoCount, stub::user_unique_info_stub_1},
        },
    };

    #[test]
    fn user_repo_stub_default() {
        assert_eq!(UserRepositoryStub::default().create(&user_stub()), Ok(()));
        assert_eq!(UserRepositoryStub::default().update(&user_stub()), Ok(()));
        assert_eq!(UserRepositoryStub::default().delete(&user_stub().id), Ok(()));
        assert_eq!(UserRepositoryStub::default().read_by_id(&user_stub().id), Ok(Some(user_stub())));
        assert_eq!(UserRepositoryStub::default().read_by_credentials(&user_credentials_stub()), Ok(Some(user_stub())));
        assert_eq!(
            UserRepositoryStub::default().read_count_unique_info(&user_unique_info_stub_1()),
            Ok(UserUniqueInfoCount { email: 0, username: 0 })
        );
    }

    #[test]
    fn user_repo_stub_of_bd_err() {
        assert_eq!(UserRepositoryStub::of_db_err().create(&user_stub()), Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().update(&user_stub()), Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().delete(&user_stub().id), Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().read_by_id(&user_stub().id), Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().read_by_credentials(&user_credentials_stub()), Err(DBErr));
        assert_eq!(UserRepositoryStub::of_db_err().read_count_unique_info(&user_unique_info_stub_1()), Err(DBErr));
    }

    #[test]
    fn user_repo_stub_of_none() {
        assert_eq!(UserRepositoryStub::of_none().read_by_credentials(&user_credentials_stub()), Ok(None));
        assert_eq!(UserRepositoryStub::of_none().read_by_id(&user_stub().id), Ok(None));
    }

    #[test]
    fn user_repo_stub_of_unique_info() {
        assert_eq!(
            UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }).read_count_unique_info(&user_unique_info_stub_1()),
            Ok(UserUniqueInfoCount { username: 1, email: 0 })
        );
    }
}
