import React, {useState} from 'react';
// import PropTypes from 'prop-types';

const Search = () => {
  
  const handleClick = ()=>{
    console.log(searchTarget);
  };
  const [searchTarget, setSearchTarget] = useState('');
  const onChange = (e:any) => {
    setSearchTarget(e.target.value);
  };

  return (
    <div>
      <h1>Search Jobs</h1>
      <form>
        <input value={searchTarget} onChange={ (e)=>{ onChange(e); } } id='jobSearch' placeholder='Search jobs...'/>
        <input type='button' value='Submit' onClick={ ()=>{ handleClick(); } } />
      </form>
      
    </div>
  );
};

Search.propTypes = {};

export default Search;
