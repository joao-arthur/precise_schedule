use crate::schedule::user::{
    error::{UserErr, UserUniqueInfoFieldErr},
    repository::UserRepository,
};

use super::UserUniqueInfo;

pub async fn user_unique_info_is_valid_sign_up<Repo: UserRepository>(
    repository: &Repo,
    user: &UserUniqueInfo,
) -> Result<(), UserErr> {
    let unique_info = repository.read_count_unique_info(user).await.map_err(UserErr::DB)?;
    let username_err = unique_info.username > 0;
    let email_err = unique_info.email > 0;
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

    use super::user_unique_info_is_valid_sign_up;

    #[tokio::test]
    async fn user_unique_info_is_valid_sign_up_ok() {
        assert_eq!(
            user_unique_info_is_valid_sign_up(
                &UserRepositoryStub::of_empty(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Ok(())
        );
    }

    #[tokio::test]
    async fn user_unique_info_is_valid_sign_up_db_err() {
        assert_eq!(
            user_unique_info_is_valid_sign_up(
                &UserRepositoryStub::of_db_err(),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_unique_info_is_valid_sign_up_user_unique_info_field() {
        assert_eq!(
            user_unique_info_is_valid_sign_up(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 1,
                    email: 0
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: false
            })),
        );
        assert_eq!(
            user_unique_info_is_valid_sign_up(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 0,
                    email: 1
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: false,
                email: true
            })),
        );
        assert_eq!(
            user_unique_info_is_valid_sign_up(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 1,
                    email: 1
                }),
                &UserUniqueInfo { username: "john123".into(), email: "john@gmail.com".into() }
            )
            .await,
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: true
            })),
        );
    }
}
