import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import createQueryRenderer from '../../relay/createQueryRendererModern';

const Post = ({ Post }) => (
  <div>
    <span>{Post.title}</span>
    <span>{Post.text}</span>
  </div>
);

const PostFragmentContainer = createFragmentContainer(Post, {
  Post: graphql`
    fragment Post_Post on Post {
      id
      title
      text
    }
  `,
});

const AppQR = createQueryRenderer(PostFragmentContainer, Post, {
  query: graphql`
    query PostQuery($id: ID!) {
      Post(id: $id) {
        ...Post_Post
      }
    }
  `,
  queriesParams: () => ({
    id: 'ck2hdh20m0va70135cptz2jn4',
  }),
  getFragmentProps: ({ Post }) => {
    return {
      Post,
    };
  },
});

export default AppQR;
