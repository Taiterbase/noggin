struct Parser {
    line_pos: usize,
    input: Vec<String>,
}

pub fn parse(mut source: String) -> String {
    return source;
    source = sanitize_input(source);
    let lines: Vec<String> = source
        .split("\n")
        .map(|c| c.to_string())
        .collect::<Vec<String>>();
    let mut parser = Parser {
        line_pos: 0,
        input: lines,
    };
    return parser.parse_lines();
}

fn sanitize_input(source: String) -> String {
    let result = source.to_string();
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

            let line = self.parse_line();
            result.push_str(&line);
            self.line_pos += 1;
        }

        println!("parser input: {:?}", result);
        return result.to_string();
    }

    fn parse_line(&mut self) -> String {
        let mut line = String::new();
        let line_chars: Vec<char> = self.input[self.line_pos].chars().collect();
        let mut i = 0;
        let mut code_pos_start = 0;
        let mut code_pos_end = 0;
        let (h_len, title) = self.parse_title(&line_chars);
        line.push_str(&title);
        println!("{}", title);
        if h_len > 0 {
            i = h_len;
        }
        loop {
            if i >= line_chars.len() {
                break;
            }
            let c = line_chars[i];
            match c {
                '-' => {}
                '`' => {} //only handle this within the same line.
                _ => line.push(c),
            }
            i += 1;
        }
        if h_len > 0 {
            line.push_str(&format!("</h{}>", h_len))
        }
        return line;
    }

    fn parse_title(&mut self, line_chars: &Vec<char>) -> (usize, String) {
        let mut header = String::new();
        let mut h_len = 0;
        let mut i = 0;
        loop {
            if i >= line_chars.len() {
                if h_len > 0 {
                    if line_chars[i - 1] == '#' {
                        h_len = 0;
                    }
                }
                break;
            }
            let c = line_chars[i];
            if c == '#' {
                h_len += 1;
            } else if c == ' ' {
                break;
            } else {
                h_len = 0;
                break;
            }
            i += 1;
        }

        if h_len > 0 && h_len < 7 {
            header.push_str(&format!("<h{}>", h_len));
            let mut h_len_temp = h_len;
            header.push_str(&format!("<div hidden >"));
            loop {
                if h_len_temp > 0 {
                    header.push('#');
                } else {
                    break;
                }
                h_len_temp -= 1;
            }
            header.push_str("</div>");
        }

        if h_len >= 7 {
            h_len = 0;
        }

        return (h_len, header);
    }

    fn parse_line_content(&mut self) -> String {
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
