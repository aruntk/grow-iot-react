import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Thing from './thing'

const THINGS_PER_PAGE = 3

function ThingsList ({ data: { allThings, loading, _allThingsMeta }, loadMoreThings }) {
  if (loading) {
    return <div>Loading</div>
  }

  const areMoreThings = allThings.length < 100 // TODO change 100 to total number of things in the db

  return (
    <section>
    <div>
    {allThings.map((thing, index) =>
        <div key={thing.uuid} className='thing'>
      <a
      className='thingLink'
      href={`/thing?id=${thing.uuid}`}
                onClick={(e) => this.showThing(e, id)}
              >
<div className='component'>
        {thing.component}
        </div>
                <div>
                UUID: {thing.uuid}
</div>
<div>
                Token: {thing.token}
</div>

<div> Name: {thing.name} </div>
<div> Registered At: {thing.registeredAt} </div>

              </a>
            </div>
    )}
</div>
    {areMoreThings ? <button onClick={() => loadMoreThings()}><span />Show More</button> : ''}
    <style jsx>{`
      section {
        padding-bottom: 20px;
      }
          .thing {
            display: inline-block;
          }
          .thingLink {
            color: #333;
            verticalAlign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 350px;
            height: 250px;
            margin: 10px;
            border: 2px solid transparent;
            text-decoration: none;
          }

          .thingLink:hover {
            borderColor: blue;
          }
.thingLink .component {
font-size: 20px;
  font-weight: bold;
  color: green;
}
.thingLink > div {
  margin : 5px;
}
      button:before {
        align-self: center;
        border-style: solid;
        border-width: 6px 4px 0 4px;
        border-color: #ffffff transparent transparent transparent;
        content: "";
        height: 0;
        width: 0;
      }
      `}</style>
    </section>
  )
}
const allThings = gql`
      query allThings($limit: Int, $skip: Int) {
        allThings(limit: $limit, skip: $skip) {
          uuid
          token
          owner
          component
          name
          registeredAt
        }
      }
`;

export default graphql(allThings, {
  options: {
    variables: {
      skip: 0,
      first: THINGS_PER_PAGE
    }
  },
  props: ({ data }) => ({
    data,
    loadMoreThings: () => {
      return data.fetchMore({
        variables: {
          skip: data.allThings.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new things results to the old one
            allThings: [...previousResult.allThings, ...fetchMoreResult.data.allThings]
          })
        }
      })
    }
  })
})(ThingsList)
