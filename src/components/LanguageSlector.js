function LanguageSelector(props) {
  let { handleClick, value } = props;
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <header className='header'>
      <nav className='menus'>
        {languages.map((language, i) => {
          return (
            <button
              key={i}
              className={value === language ? 'active-menu' : ''}
              onClick={handleClick}
            >
              {language}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default LanguageSelector;
