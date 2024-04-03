import { getNoteById } from "../../[id]/page";
import { ChangeNote } from "./change-note";

export default async function ChangeCurrentNote ({params: {id}}) {
    const note = await getNoteById({ id });
 
    return <ChangeNote note={note} id={id} />
}