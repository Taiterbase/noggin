use crate::models::note_query::NotePreview;
use unicode_segmentation::UnicodeSegmentation;

pub fn generate_preview(content: String) -> NotePreview {
    let words = content.unicode_words().collect::<Vec<&str>>();
    let preview: NotePreview = NotePreview {
        title: words[0..1].join(" "),
        content: words[1..2].join(" "),
    };
    return preview;
}
