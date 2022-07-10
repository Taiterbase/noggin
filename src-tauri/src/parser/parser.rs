struct Parser {
    line_pos: usize,
    char_pos: usize,
    input: Vec<String>,
}

pub fn parse(mut source: String) -> String {
    source = sanitize_input(source);
    let lines: Vec<String> = source
        .split("\n")
        .map(|c| c.to_string())
        .collect::<Vec<String>>();
    let mut parser = Parser {
        line_pos: 0,
        char_pos: 0,
        input: lines,
    };
    return parser.parse_lines();
}

fn sanitize_input(source: String) -> String {
    let mut result = source.to_string();
    result = result.replace("<br>", "");
    return result;
}

impl Parser {
    fn parse_lines(&mut self) -> String {
        let mut result = String::new();
        let num_lines = self.input.len();
        loop {
            if self.line_pos >= num_lines {
                break;
            }
            if self.line_pos + 1 == num_lines && self.input[self.line_pos] == "" {
                // don't insert another newline at the end of input
                break;
            }

            let line_start = self.parse_line_start();
            let line = self.parse_line();
            result.push_str(&line);
            self.line_pos += 1;
        }

        println!("parser input: {:?}", result);
        return result.to_string();
    }

    fn parse_line_start(&mut self) -> String {
        let mut line = String::new();
        let line_chars: Vec<char> = self.input[self.line_pos].chars().collect();
        let mut i = 0;
        loop {
            if i >= line_chars.len() {
                break;
            }
            let c = line_chars[i];
            match c {
                '#' => {}
                '-' => {}
                '`' => {} //only handle this within the same line.
                _ => {}
            }
            i += 1;
        }
        return line;
    }

    fn parse_line(&mut self) -> String {
        let line = String::new();
        return line;
    }
}

fn create_html_element(tag_name: String, text: String) -> String {
    format!("<{}>{}</{}>", tag_name, text, tag_name)
}

fn is_newline(c: char) -> bool {
    c == '\n'
}
