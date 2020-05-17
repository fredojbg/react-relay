import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import createQueryRenderer from '../../relay/createQueryRendererModern';

const Feed = ({ feed }) => (
  <>
    {feed.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </>
);

const PostFragmentContainer = createFragmentContainer(Feed, {
  feed: graphql`
    fragment Feed_feed on User {
      id
      name
    }
  `,
});

const AppQR = createQueryRenderer(PostFragmentContainer, Feed, {
  query: graphql`
    query FeedQuery {
      feed: allUsers(first: 10, skip: 2) {
        ...Feed_feed
      }
    }
  `,

  getFragmentProps: ({ feed }) => {
    console.log(feed);
    return {
      feed,
    };
  },
});

export default AppQR;
