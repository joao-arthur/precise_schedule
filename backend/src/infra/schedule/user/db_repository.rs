use super::entity;
use domain::{
    database::DBErr,
    schedule::user::{
        model::{User, UserCredentials},
        repository::UserRepository,
        unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    },
};
use sea_orm::*;

pub struct UserRepositoryDB<'a> {
    pub db: &'a DbConn,
}

unsafe impl<'a> Sync for UserRepositoryDB<'a> {}

impl<'a> UserRepository for UserRepositoryDB<'a> {
    async fn create(&self, user: &User) -> Result<(), DBErr> {
        let id = uuid::Uuid::try_parse(&user.id).map_err(|_| DBErr)?;
        let birthdate = chrono::NaiveDate::parse_from_str(&user.birthdate, "%Y-%m-%d").map_err(|_| DBErr)?;
        let created_at =
            chrono::DateTime::parse_from_rfc3339(&user.created_at).map_err(|_| DBErr)?;
        let updated_at =
            chrono::DateTime::parse_from_rfc3339(&user.updated_at).map_err(|_| DBErr)?;
        let model = entity::Model {
            id: id.clone(),
            username: user.username.clone(),
            password: user.password.clone(),
            email: user.email.clone(),
            first_name: user.first_name.clone(),
            birthdate: birthdate.clone(),
            created_at: created_at.clone(),
            updated_at: updated_at.clone(),
        };
        let active_model = entity::ActiveModel {
            id: Set(model.id.to_owned()),
            username: Set(model.username.to_owned()),
            password: Set(model.password.to_owned()),
            email: Set(model.email.to_owned()),
            first_name: Set(model.first_name.to_owned()),
            birthdate: Set(model.birthdate.to_owned()),
            created_at: Set(model.created_at.to_owned()),
            updated_at: Set(model.updated_at.to_owned()),
        };
        let res = active_model.save(self.db).await;
        match res {
            Ok(_) => Ok(()),
            Err(_) => Err(DBErr),
        }
    }

    async fn update(&self, user: &User) -> Result<(), DBErr> {
        let id = uuid::Uuid::try_parse(&user.id).map_err(|_| DBErr)?;
        let birthdate = chrono::NaiveDate::parse_from_str(&user.birthdate, "%Y-%m-%d").map_err(|_| DBErr)?;
        let created_at =
            chrono::DateTime::parse_from_rfc3339(&user.created_at).map_err(|_| DBErr)?;
        let updated_at =
            chrono::DateTime::parse_from_rfc3339(&user.updated_at).map_err(|_| DBErr)?;
        let model = entity::Model {
            id: id.clone(),
            username: user.username.clone(),
            password: user.password.clone(),
            email: user.email.clone(),
            first_name: user.first_name.clone(),
            birthdate: birthdate.clone(),
            created_at: created_at.clone(),
            updated_at: updated_at.clone(),
        };
        let active_model = entity::ActiveModel::from(model);
        let res = active_model.update(self.db).await;
        match res {
            Ok(_) => Ok(()),
            Err(_) => Err(DBErr),
        }
    }

    async fn delete(&self, id: &str) -> Result<(), DBErr> {
        let id = uuid::Uuid::try_parse(id).map_err(|_| DBErr)?;
        let model =
            entity::Entity::find_by_id(id).one(self.db).await.map_err(|_| DBErr)?.ok_or(DBErr)?;
        let active_model = entity::ActiveModel::from(model);
        let res = active_model.delete(self.db).await;
        match res {
            Ok(_) => Ok(()),
            Err(_) => Err(DBErr),
        }
    }

    async fn read_by_credentials(
        &self,
        credentials: &UserCredentials,
    ) -> Result<Option<User>, DBErr> {
        let res = entity::Entity::find()
            .filter(
                entity::Column::Username
                    .eq(credentials.username.clone())
                    .and(entity::Column::Password.eq(credentials.password.clone())),
            )
            .one(self.db)
            .await;
        match res {
            Ok(value) => match value {
                Some(user) => Ok(Some(User {
                    id: user.id.to_string(),
                    username: user.username.clone(),
                    password: user.password.clone(),
                    email: user.email.clone(),
                    first_name: user.first_name.clone(),
                    birthdate: user.birthdate.format("%Y-%m-%d").to_string(),
                    created_at: user.created_at.to_rfc3339(),
                    updated_at: user.updated_at.to_rfc3339(),
                })),
                None => Ok(None),
            },
            Err(_) => Err(DBErr),
        }
    }

    async fn read_by_id(&self, id: &str) -> Result<Option<User>, DBErr> {
        let id = uuid::Uuid::try_parse(id).map_err(|_| DBErr)?;
        let res = entity::Entity::find_by_id(id).one(self.db).await;
        match res {
            Ok(value) => match value {
                Some(user) => Ok(Some(User {
                    id: user.id.to_string(),
                    username: user.username.clone(),
                    password: user.password.clone(),
                    email: user.email.clone(),
                    first_name: user.first_name.clone(),
                    birthdate: user.birthdate.format("%Y-%m-%d").to_string(),
                    created_at: user.created_at.to_rfc3339(),
                    updated_at: user.updated_at.to_rfc3339(),
                })),
                None => Ok(None),
            },
            Err(_) => Err(DBErr),
        }
    }

    async fn read_count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> Result<UserUniqueInfoCount, DBErr> {
        let res_username = entity::Entity::find()
            .filter(entity::Column::Username.eq(user_unique_info.username.clone()))
            .count(self.db)
            .await
            .map_err(|_|DBErr)?;
        let res_email = entity::Entity::find()
            .filter(entity::Column::Email.eq(user_unique_info.email.clone()))
            .count(self.db)
            .await
            .map_err(|_|DBErr)?;
        Ok(UserUniqueInfoCount { email: res_email as u32, username: res_username as u32 })
    }
}
