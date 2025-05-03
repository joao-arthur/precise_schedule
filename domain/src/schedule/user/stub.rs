use crate::database::{DBErr, DBOp};

use super::{
    create::UserC,
    login::UserCred,
    model::User,
    read::UserInfo,
    repo::UserRepo,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    update::UserU,
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

pub fn user_cred_stub() -> UserCred {
    UserCred { username: "paul_mc".into(), password: "asdf!@#123".into() }
}

pub fn user_c_stub() -> UserC {
    UserC {
        email: "paul@gmail.com".into(),
        first_name: "Paul McCartney".into(),
        birthdate: "1942-06-18".into(),
        username: "paul_mc".into(),
        password: "asdf!@#123".into(),
    }
}

pub fn user_after_c_stub() -> User {
    User { updated_at: "2024-03-01T11:26Z".into(), ..user_stub() }
}

pub fn user_u_stub() -> UserU {
    UserU {
        email: "john@gmail.com".into(),
        first_name: "John Lennon".into(),
        birthdate: "1940-10-09".into(),
        username: "john_lennon".into(),
        password: "abcd!@#$4321".into(),
    }
}

pub fn user_after_u_stub() -> User {
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

pub fn user_unique_stub_1() -> UserUniqueInfo {
    UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
}

pub fn user_unique_stub_2() -> UserUniqueInfo {
    UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() }
}

pub fn user_unique_stub_3() -> UserUniqueInfo {
    UserUniqueInfo { username: "paul_mc".into(), email: "paul@gmail.com".into() }
}

pub fn user_info_stub() -> UserInfo {
    UserInfo { email: "paul@gmail.com".into(), first_name: "Paul McCartney".into(), birthdate: "1942-06-18".into(), username: "paul_mc".into() }
}

pub struct UserRepoStub {
    err: bool,
    user: Option<User>,
    user_unique_count: UserUniqueInfoCount,
}

impl UserRepo for UserRepoStub {
    fn c(&self, _: &User) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn u(&self, _: &User) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn d(&self, _: &str) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn r_by_id(&self, _: &str) -> DBOp<Option<User>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.user.clone())
    }

    fn r_by_cred(&self, _: &UserCred) -> DBOp<Option<User>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.user.clone())
    }

    fn r_count_unique_info(&self, _: &UserUniqueInfo) -> DBOp<UserUniqueInfoCount> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.user_unique_count.clone())
    }
}

impl Default for UserRepoStub {
    fn default() -> Self {
        UserRepoStub { err: false, user: Some(user_stub()), user_unique_count: UserUniqueInfoCount { email: 0, username: 0 } }
    }
}

impl UserRepoStub {
    pub fn of_none() -> Self {
        UserRepoStub { user: None, ..Default::default() }
    }

    pub fn of_unique_info(user_unique_count: UserUniqueInfoCount) -> Self {
        UserRepoStub { user_unique_count, ..Default::default() }
    }

    pub fn of_db_err() -> Self {
        UserRepoStub { err: true, ..Default::default() }
    }
}

#[cfg(test)]
mod test {
    use super::{UserRepoStub, user_cred_stub, user_stub, user_unique_stub_1};
    use crate::{
        database::DBErr,
        schedule::user::{repo::UserRepo, unique_info::UserUniqueInfoCount},
    };

    #[test]
    fn test_user_repo_stub_default() {
        assert_eq!(UserRepoStub::default().c(&user_stub()), Ok(()));
        assert_eq!(UserRepoStub::default().u(&user_stub()), Ok(()));
        assert_eq!(UserRepoStub::default().d(&user_stub().id), Ok(()));
        assert_eq!(UserRepoStub::default().r_by_id(&user_stub().id), Ok(Some(user_stub())));
        assert_eq!(UserRepoStub::default().r_by_cred(&user_cred_stub()), Ok(Some(user_stub())));
        assert_eq!(UserRepoStub::default().r_count_unique_info(&user_unique_stub_1()), Ok(UserUniqueInfoCount { email: 0, username: 0 }));
    }

    #[test]
    fn test_user_repo_stub_of_bd_err() {
        assert_eq!(UserRepoStub::of_db_err().c(&user_stub()), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().u(&user_stub()), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().d(&user_stub().id), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().r_by_id(&user_stub().id), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().r_by_cred(&user_cred_stub()), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().r_count_unique_info(&user_unique_stub_1()), Err(DBErr));
    }

    #[test]
    fn test_user_repo_stub_of_none() {
        assert_eq!(UserRepoStub::of_none().r_by_cred(&user_cred_stub()), Ok(None));
        assert_eq!(UserRepoStub::of_none().r_by_id(&user_stub().id), Ok(None));
    }

    #[test]
    fn test_user_repo_stub_of_unique_info() {
        assert_eq!(
            UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 1, email: 0 }).r_count_unique_info(&user_unique_stub_1()),
            Ok(UserUniqueInfoCount { username: 1, email: 0 })
        );
    }
}
