use chrono::{FixedOffset, Utc};
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "app_user")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: uuid::Uuid,

    pub username: String,

    pub password: String,

    #[sea_orm(unique)]
    pub email: String,

    pub first_name: String,

    #[sea_orm(unique)]
    pub birthdate: chrono::NaiveDate,

    pub created_at: chrono::DateTime<FixedOffset>,

    pub updated_at: chrono::DateTime<FixedOffset>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
