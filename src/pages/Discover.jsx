import React from "react";
import { PostsDiscovery } from "../components/discovery/posts";
import { PeopleDiscovery } from "../components/discovery/people";

const PEOPLE_DISCOVERY = "PEOPLE";
const POSTS_DISCOVERY = "POSTS";

const DiscoverBody = ({ discoveryType }) => {
  if (discoveryType === PEOPLE_DISCOVERY) {
    return <PeopleDiscovery />;
  } else if (discoveryType === POSTS_DISCOVERY) {
    return <PostsDiscovery />;
  }
  return null;
};

export default function Discover() {
  const [discoveryType, setDiscoveryType] = React.useState(undefined);

  return (
    <div className="bg-white w-1/2 ml-[360px] p-8 mt-8 rounded-lg shadow-lg grid">
      <div className="text-4xl text-black">Discover</div>
      <br />
      <div className="flex">
        <button
          onClick={() => setDiscoveryType(PEOPLE_DISCOVERY)}
          className="p-2 rounded-lg text-orange-400 text-lg"
        >
          People
        </button>
        <br />
        <button
          onClick={() => setDiscoveryType(POSTS_DISCOVERY)}
          className="p-2 rounded-lg text-orange-400 text-lg"
        >
          Posts
        </button>
      </div>
      <br />

      <DiscoverBody discoveryType={discoveryType} />
    </div>
  );
}
