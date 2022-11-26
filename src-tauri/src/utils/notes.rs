use crate::models::note_query::NotePreview;
use serde_json::{from_str, Value};
use unicode_segmentation::UnicodeSegmentation;

pub fn generate_preview(content: String) -> NotePreview {
    let content_json: serde_json::Result<Value> = from_str(&content);
    let mut title = String::new();
    let mut content = String::new();
    match content_json {
        Ok(c) => {
            // gross!
            if c["type"] == "doc" {
                if c["content"].is_array() {
                    for e in c["content"].as_array() {
                        let mut i = 0;
                        for element in e {
                            if element["content"].is_array() {
                                for ele in element["content"].as_array() {
                                    if i == 0 {
                                        if ele.len() >= 1 {
                                            title.push_str(&ele[0]["text"].to_string());
                                        }
                                    } else if i <= 3 {
                                        let str = ele[0]["text"].as_str().unwrap_or_default();
                                        if str.len() > 0 {
                                            content.push_str(
                                                (str.to_owned() + &" ".to_owned()).as_str(),
                                            );
                                        }
                                    }
                                }
                            }
                            i += 1;
                        }
                    }
                }
            }
        }
        Err(e) => {
            println!("{}", e);
        }
    }
    if title.len() > 2 {
        title = match substr(title.as_str(), 1, Some((title.len() - 2).min(100))) {
            Ok(str) => str,
            Err(str) => str,
        }
        .to_string();
    }

    if content.len() > 0 {
        content = match substr(content.as_str(), 0, Some((content.len()).min(54))) {
            Ok(str) => str,
            Err(str) => str,
        }
        .to_string();
    }
    let preview: NotePreview = NotePreview {
        title: title.to_owned(),
        content: content.to_owned(),
    };
    return preview;
}

fn substr(s: &str, begin: usize, length: Option<usize>) -> Result<&str, &str> {
    use std::iter::once;
    let mut itr = s
        .grapheme_indices(true)
        .map(|(n, _)| n)
        .chain(once(s.len()));
    let beg = itr.nth(begin);
    if beg.is_none() {
        return Err("");
    } else if length == Some(0) {
        return Ok("");
    }
    let end = length.map_or(Some(s.len()), |l| itr.nth(l - 1));
    if let Some(end) = end {
        return Ok(&s[beg.unwrap()..end]);
    } else {
        return Err(&s[beg.unwrap()..s.len()]);
    }
}
