use accept_language::parse;
use axum::{extract::FromRequestParts, http::request::Parts, response::Response};

use domain::language::Language;

#[derive(Debug, PartialEq)]
pub struct LanguageExtractor(pub Language);

impl<S> FromRequestParts<S> for LanguageExtractor
where
    S: Send + Sync,
{
    type Rejection = Response;

    async fn from_request_parts(parts: &mut Parts, _s: &S) -> Result<Self, Self::Rejection> {
        let lang = parts
            .headers
            .get("Accept-Language")
            .and_then(|header| header.to_str().ok())
            .and_then(|header| parse(header).get(0).cloned())
            .unwrap_or_else(|| "en".into());
        Ok(LanguageExtractor(Language::from_iso_639_1(&lang)))
    }
}
