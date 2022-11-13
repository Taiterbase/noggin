import { getLayout as NotesLayout } from "layouts/notes"; // effectively getLayout from layouts/home

function HomePage(props: any) {
    return (
        <div>
            <p>
                Home Page! Uneditable editor page with content created from the editor! Hooray!
            </p>
        </div>
    )
}

HomePage.getLayout = NotesLayout;
export default HomePage;