use crate::domain::database::DBErr;

use super::{
    create::UserC,
    login::UserCred,
    model::User,
    read_info::UserInfo,
    repo::UserRepo,
    unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    update::UserU,
};

pub fn user_stub() -> User {
    User {
        id: String::from("a6edc906-2f9f-5fb2-a373-efac406f0ef2"),
        email: String::from("paul@gmail.com"),
        first_name: String::from("Paul McCartney"),
        birthdate: String::from("1942-06-18"),
        username: String::from("paul_mc"),
        password: String::from("asdf!@#123"),
        created_at: String::from("2024-03-01T11:26:41Z"),
        updated_at: String::from("2024-07-03T22:49:51Z"),
    }
}

pub fn user_cred_stub() -> UserCred {
    UserCred { username: String::from("paul_mc"), password: String::from("asdf!@#123") }
}

pub fn user_c_stub() -> UserC {
    UserC {
        email: String::from("paul@gmail.com"),
        first_name: String::from("Paul McCartney"),
        birthdate: String::from("1942-06-18"),
        username: String::from("paul_mc"),
        password: String::from("asdf!@#123"),
    }
}

pub fn user_after_c_stub() -> User {
    User { updated_at: String::from("2024-03-01T11:26:41Z"), ..user_stub() }
}

pub fn user_u_stub() -> UserU {
    UserU {
        email: String::from("john@gmail.com"),
        first_name: String::from("John Lennon"),
        birthdate: String::from("1940-10-09"),
        username: String::from("john_lennon"),
        password: String::from("abcd!@#$4321"),
    }
}

pub fn user_after_u_stub() -> User {
    User {
        email: String::from("john@gmail.com"),
        first_name: String::from("John Lennon"),
        birthdate: String::from("1940-10-09"),
        username: String::from("john_lennon"),
        password: String::from("abcd!@#$4321"),
        updated_at: String::from("2024-07-03T22:49:51Z"),
        ..user_stub()
    }
}

pub fn user_unique_stub_1() -> UserUniqueInfo {
    UserUniqueInfo { username: String::from("john123"), email: String::from("john@gmail.com") }
}

pub fn user_unique_stub_2() -> UserUniqueInfo {
    UserUniqueInfo { username: String::from("peter987"), email: String::from("peter@gmail.com") }
}

pub fn user_info_stub() -> UserInfo {
    UserInfo {
        email: String::from("paul@gmail.com"),
        first_name: String::from("Paul McCartney"),
        birthdate: String::from("1942-06-18"),
        username: String::from("paul_mc"),
    }
}

pub struct UserRepoStub(
    Result<(), DBErr>,
    Result<Option<User>, DBErr>,
    Result<UserUniqueInfoCount, DBErr>,
);

impl UserRepo for UserRepoStub {
    fn c(&self, _: &User) -> Result<(), DBErr> {
        self.0.clone()
    }

    fn u(&self, _: &User) -> Result<(), DBErr> {
        self.0.clone()
    }

    fn d(&self, _: &String) -> Result<(), DBErr> {
        self.0.clone()
    }

    fn r_by_id(&self, _: &str) -> Result<Option<User>, DBErr> {
        self.1.clone()
    }

    fn r_by_cred(&self, _: &UserCred) -> Result<Option<User>, DBErr> {
        self.1.clone()
    }

    fn r_count_unique_info(&self, _: &UserUniqueInfo) -> Result<UserUniqueInfoCount, DBErr> {
        self.2.clone()
    }
}

impl Default for UserRepoStub {
    fn default() -> Self {
        UserRepoStub(
            Ok(()),
            Ok(Some(user_stub())),
            Ok(UserUniqueInfoCount { email: 0, username: 0 }),
        )
    }
}

impl UserRepoStub {
    pub fn of_1(arg: Option<User>) -> Self {
        UserRepoStub(UserRepoStub::default().0, Ok(arg), UserRepoStub::default().2)
    }

    pub fn of_2(arg: UserUniqueInfoCount) -> Self {
        UserRepoStub(UserRepoStub::default().0, UserRepoStub::default().1, Ok(arg))
    }

    pub fn of_db_err() -> Self {
        UserRepoStub(Err(DBErr), Err(DBErr), Err(DBErr))
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_user_repo_stub_default() {
        assert_eq!(UserRepoStub::default().c(&user_stub()), Ok(()));
        assert_eq!(UserRepoStub::default().u(&user_stub()), Ok(()));
        assert_eq!(UserRepoStub::default().d(&user_stub().id), Ok(()));
        assert_eq!(UserRepoStub::default().r_by_id(&user_stub().id), Ok(Some(user_stub())));
        assert_eq!(UserRepoStub::default().r_by_cred(&user_cred_stub()), Ok(Some(user_stub())));
        assert_eq!(
            UserRepoStub::default().r_count_unique_info(&user_unique_stub_1()),
            Ok(UserUniqueInfoCount { email: 0, username: 0 })
        );
    }

    #[test]
    fn test_user_repo_stub_of_bd_err() {
        assert_eq!(UserRepoStub::of_db_err().c(&user_stub()), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().u(&user_stub()), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().d(&user_stub().id), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().r_by_id(&user_stub().id), Err(DBErr));
        assert_eq!(UserRepoStub::of_db_err().r_by_cred(&user_cred_stub()), Err(DBErr));
        assert_eq!(
            UserRepoStub::of_db_err().r_count_unique_info(&user_unique_stub_1()),
            Err(DBErr)
        );
    }

    #[test]
    fn test_user_repo_stub_from_1() {
        assert_eq!(UserRepoStub::of_1(None).r_by_cred(&user_cred_stub()), Ok(None));
        assert_eq!(UserRepoStub::of_1(None).r_by_id(&user_stub().id), Ok(None));
    }

    #[test]
    fn test_user_repo_stub_from_2() {
        assert_eq!(
            UserRepoStub::of_2(UserUniqueInfoCount { username: 1, email: 0 })
                .r_count_unique_info(&user_unique_stub_1()),
            Ok(UserUniqueInfoCount { username: 1, email: 0 })
        );
    }
}
