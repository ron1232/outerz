import React from 'react';

const HomeHeader = () => {
  return (
    <div class='p-md-5 m-md-3 text-center bg-midnight'>
      <div class='col-md-5 mx-auto'>
        <h1 class='display-4 font-weight-normal'>OuterZ</h1>
        <p class='lead font-weight-normal'>
          And an even wittier subheading to boot. Jumpstart your marketing
          efforts with this example based on Apple's marketing pages.
        </p>
        <a class='btn btn-primary' href='#'>
          Coming soon
        </a>
      </div>
      <div class='product-device box-shadow d-none d-md-block'></div>
      <div class='product-device product-device-2 box-shadow d-none d-md-block'></div>
    </div>
  );
};

export default HomeHeader;
