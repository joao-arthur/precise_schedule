use super::entity;
use domain::{
    database::{DBErr, DBOp},
    schedule::user::{
        model::{User, UserCredentials},
        repository::UserRepository,
        unique_info::{UserUniqueInfo, UserUniqueInfoCount},
    },
};
use sea_orm::*;

pub struct Mutation;

impl Mutation {
    pub async fn create_user(
        db: &DbConn,
        form_data: entity::Model,
    ) -> Result<entity::ActiveModel, DbErr> {
        entity::ActiveModel { id: Set(form_data.id.to_owned()) }.save(db).await
    }

    pub async fn update_user(
        db: &DbConn,
        form_data: entity::Model,
    ) -> Result<entity::Model, DbErr> {
        entity::ActiveModel { id: Set(form_data.id.to_owned()) }.update(db).await
    }

    pub async fn delete_user(db: &DbConn, id: String) -> Result<DeleteResult, DbErr> {
        let user: entity::ActiveModel = entity::Entity::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find user.".to_owned()))
            .map(Into::into)?;
        user.delete(db).await
    }
}

pub struct Query;

impl Query {
    pub async fn read_user_by_id(db: &DbConn, id: String) -> Result<Option<entity::Model>, DbErr> {
        entity::Entity::find_by_id(id).one(db).await
    }

    pub async fn find_users_in_page(
        db: &DbConn,
        page: u64,
        users_per_page: u64,
    ) -> Result<(Vec<entity::Model>, u64), DbErr> {
        let paginator =
            entity::Entity::find().order_by_asc(entity::Column::Id).paginate(db, users_per_page);
        let num_pages = paginator.num_pages().await?;
        paginator.fetch_page(page - 1).await.map(|p| (p, num_pages))
    }
}

pub struct UserRepositoryDB<'a> {
  pub  db: &'a DbConn,
}

unsafe impl<'a> Sync for UserRepositoryDB<'a> {}

impl<'a> UserRepository for UserRepositoryDB<'a> {
    async fn create(&self, user: &User) -> DBOp<()> {
        let form_data = entity::Model { id: user.id.clone() };
        let res = Mutation::create_user(self.db, form_data).await;
        match res {
            Ok(_) => Ok(()),
            Err(_) => Err(DBErr),
        }
    }

    async fn update(&self, user: &User) -> DBOp<()> {
        let form_data = entity::Model { id: user.id.clone() };
        let res = Mutation::update_user(self.db, form_data).await;
        match res {
            Ok(_) => Ok(()),
            Err(_) => Err(DBErr),
        }
    }

    async fn delete(&self, id: &str) -> DBOp<()> {
        Ok(())
    }

    async fn read_by_credentials(&self, credentials: &UserCredentials) -> DBOp<Option<User>> {
        Ok(None)
    }

    async fn read_by_id(&self, id: &str) -> DBOp<Option<User>> {
        Ok(None)
    }

    async fn read_count_unique_info(
        &self,
        user_unique_info: &UserUniqueInfo,
    ) -> DBOp<UserUniqueInfoCount> {
        Ok(UserUniqueInfoCount { email: 0, username: 0 })
    }
}
