export default {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
      {
        name: 'username',
        type: 'string',
        title: 'Username',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'text',
        type: 'text',
        title: 'Text',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'blog',
        type: 'reference',
        to: [{ type: 'blog' }],
        title: 'Blog',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
    ],
  };
  