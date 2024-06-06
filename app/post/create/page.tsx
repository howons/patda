import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea,
} from "@headlessui/react";

function PostCreatePage() {
  return (
    <form>
      <Fieldset>
        <Legend>중고거래 진상 박제</Legend>
        <div>
          <Field>
            <Label>거래 플랫폼</Label>
          </Field>
          <Field>
            <Label>상대 닉네임</Label>
            <Input type="text" name="targetNickname" />
          </Field>
        </div>
        <Field>
          <Label>사유</Label>
          <Input type="hidden" name="tags" />
        </Field>
        <Field>
          <Label>스크린샷</Label>
          <Input type="file" name="imageUrls" />
        </Field>
        <Field>
          <Label>상세 설명</Label>
          <Textarea name="content" />
        </Field>
      </Fieldset>
      <button>임시 저장</button>
      <button type="submit">작성</button>
    </form>
  );
}

export default PostCreatePage;
