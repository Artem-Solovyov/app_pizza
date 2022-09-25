import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
      <circle cx="132" cy="138" r="120" />
      <rect x="-1" y="282" rx="13" ry="13" width="280" height="30" />
      <rect x="-1" y="346" rx="10" ry="10" width="280" height="86" />
      <rect x="2" y="459" rx="10" ry="10" width="95" height="30" />
      <rect x="123" y="448" rx="20" ry="20" width="152" height="45" />
    </ContentLoader>
)

export default MyLoader