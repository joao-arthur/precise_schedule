use crate::schedule::user::{
    error::{UserErr, UserUniqueInfoFieldErr},
    repository::UserRepository,
};

use super::UserUniqueInfo;

pub async fn user_unique_info_is_valid_update<Repo: UserRepository>(
    repository: &Repo,
    user: &UserUniqueInfo,
    old_user: &UserUniqueInfo,
) -> Result<(), UserErr> {
    if user.username == old_user.username && user.email == old_user.email {
        return Ok(());
    }
    let unique_info = repository.read_count_unique_info(user).await.map_err(UserErr::DB)?;
    let username_err = user.username != old_user.username && unique_info.username > 0;
    let email_err = user.email != old_user.email && unique_info.email > 0;
    if username_err || email_err {
        return Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
            username: username_err,
            email: email_err,
        }));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::user::{
            error::{UserErr, UserUniqueInfoFieldErr},
            repository::stub::UserRepositoryStub,
            unique_info::{UserUniqueInfo, UserUniqueInfoCount},
        },
    };

    use super::user_unique_info_is_valid_update;

    #[tokio::test]
    async fn user_update_unique_info_is_valid_ok() {
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_empty(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Ok(())
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 1,
                    email: 0
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Ok(()),
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 0,
                    email: 1
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Ok(()),
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 1,
                    email: 1
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Ok(()),
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 2,
                    email: 1
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Ok(()),
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 1,
                    email: 2
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Ok(()),
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_empty(),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Ok(())
        );
    }

    #[tokio::test]
    async fn user_update_unique_info_is_valid_db_err() {
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_db_err(),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_unique_info_is_valid_update_user_unique_info_field_err() {
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 1,
                    email: 0
                }),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: false
            })),
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 0,
                    email: 1
                }),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: false,
                email: true
            })),
        );
        assert_eq!(
            user_unique_info_is_valid_update(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 1,
                    email: 1
                }),
                &UserUniqueInfo { username: "peter987".into(), email: "peter@gmail.com".into() },
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() },
            )
            .await,
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: true
            })),
        );
    }
}
