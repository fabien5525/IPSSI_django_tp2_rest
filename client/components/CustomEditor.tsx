import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
}

const CustomEditor = ({ value, setValue }: EditorProps) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => setValue(editor.getData())}
    />
  );
};

export default CustomEditor;
