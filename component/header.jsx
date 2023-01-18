const Header = () => {
    return(
        <div className="topbar">
        <a href="#">Home</a>
        {/* <a href="/login">Place Order</a> */}
        <a href="#">About</a>
        {/* <a className='bar_signup' href="/signup">Sign Up</a> */}
        <a className='bar_signin' href="/login">Sign in</a>
      </div>
    )
}

export default Header;