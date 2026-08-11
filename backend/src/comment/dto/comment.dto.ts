export class CreateCommentDto {
  text!: string;
  postId!: string;
  parentId?: string;
}
