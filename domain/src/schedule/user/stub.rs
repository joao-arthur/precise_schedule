use crate::{database::{DBErr, DBOp}, session::stub::session_stub};

use super::{
    create::{UserCreate, UserCreateResult},
    login::UserCredentials,
    model::User,
    read::UserInfo,
    repository::UserRepository,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    update::{UserUpdate, UserUpdateResult},
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

pub fn user_credentials_stub() -> UserCredentials {
    UserCredentials { username: "paul_mc".into(), password: "asdf!@#123".into() }
}

pub fn user_create_stub() -> UserCreate {
    UserCreate {
        email: "paul@gmail.com".into(),
        first_name: "Paul McCartney".into(),
        birthdate: "1942-06-18".into(),
        username: "paul_mc".into(),
        password: "asdf!@#123".into(),
    }
}

pub fn user_create_result_stub() -> UserCreateResult {
    UserCreateResult {
        user: UserInfo {
            email: "paul@gmail.com".into(),
            first_name: "Paul McCartney".into(),
            birthdate: "1942-06-18".into(),
            username: "paul_mc".into(),
        },
        session: session_stub()
    }
} 

pub fn user_after_create_stub() -> User {
    User { updated_at: "2024-03-01T11:26Z".into(), ..user_stub() }
}

pub fn user_update_stub() -> UserUpdate {
    UserUpdate {
        email: "john@gmail.com".into(),
        first_name: "John Lennon".into(),
        birthdate: "1940-10-09".into(),
        username: "john_lennon".into(),
        password: "abcd!@#$4321".into(),
    }
}

pub fn user_after_update_stub() -> User {
    User {
        email: "john@gmail.com".into(),
        first_name: "John Lennon".into(),
        birthdate: "1940-10-09".into(),
        username: "john_lennon".into(),
        password: "abcd!@#$4321".into(),
        updated_at: "2024-07-03T22:49Z".into(),
        ..user_stub()
    }
}

pub fn user_update_result_stub() -> UserUpdateResult {
    UserUpdateResult {
        user: UserInfo {
            email: "john@gmail.com".into(),
            first_name: "John Lennon".into(),
            birthdate: "1940-10-09".into(),
            username: "john_lennon".into(),
        },
        session: session_stub()
    }
} 

pub fn user_unique_info_stub_1() -> UserUniqueInfo {
    UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
}

pub fn user_unique_info_stub_2() -> UserUniqueInfo {
    UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() }
}

pub fn user_unique_info_stub_3() -> UserUniqueInfo {
    UserUniqueInfo { username: "paul_mc".into(), email: "paul@gmail.com".into() }
}

pub fn user_info_stub() -> UserInfo {
    UserInfo { email: "paul@gmail.com".into(), first_name: "Paul McCartney".into(), birthdate: "1942-06-18".into(), username: "paul_mc".into() }
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
    use super::{UserRepositoryStub, user_credentials_stub, user_stub, user_unique_info_stub_1};
    use crate::{
        database::DBErr,
        schedule::user::{repository::UserRepository, unique_info::UserUniqueInfoCount},
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
