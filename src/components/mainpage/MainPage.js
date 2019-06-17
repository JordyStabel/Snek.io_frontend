import React, { Component } from "react";
import styled from "styled-components";
import Logo from "../../images/SnekIO_logo.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authAction";

//#region Styled Components
const Wrapper = styled.div`
  font-weight: 300;
  background: #181818;
  color: #fff;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 56px);
  overflow: hidden;

  @media (min-width: 1200px) {
    #left {
      flex: 4;
    }

    #right {
      flex: 6;
    }
  }

  @media (max-width: 768px) {
    #right {
      display: none;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  text-align: left;
  justify-content: center;
`;

const Right = styled.div`
  flex: 1;
`;
//#endregion

const styles = {
  wrapper: {
    fontWeight: 300,
    background: "#181818",
    color: "#fff",
    display: "flex",
    flexDirection: "row"
  },
  left: {
    display: "flex",
    flexDirection: "column",
    flex: window.innerWidth >= 1200 ? 1 : 4,
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
    height: "calc(100vh - 56px)" // -56 because of the navbar
  },
  right: {
    flex: window.innerWidth >= 1200 ? 1 : 6
  },
  login: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    paddingBottom: "1rem"
  },
  form: {
    width: "80%",
    paddingBottom: "3rem"
  },
  logo: {
    marginBottom: "8vh"
  },
  logo_img: {
    display: "block",
    margin: "auto",
    width: "80%"
  },
  label: {
    fontSize: "0.9rem",
    lineHeight: "2rem",
    fontWeight: "500"
  },
  text_input: {
    marginBottom: "1.3rem",
    width: "100%",
    borderRadius: "3px",
    background: "#181818",
    border: "1px solid #555",
    color: "#ccc",
    padding: "0.5rem 1rem",
    lineHeight: "1.3rem"
  },
  link: {
    display: "block",
    color: "#ccc",
    textDecoration: "none",
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "0.9rem"
  },
  or: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    marginBottom: "1.2rem",
    alignItems: "center"
  },
  bar: {
    flex: "auto",
    backgroundColor: "white"
  },
  span: {
    color: "#ccc",
    padding: "0 0.8rem"
  },
  footer: {
    color: "#ccc",
    textAlign: "center",
    fontSize: "0.8rem",
    maxWidth: "80%",
    paddingTop: "2.5rem"
  },
  footer_link: {
    color: "primary",
    textDecoration: "none"
  },
  showcase: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `url(https://picsum.photos/id/${Math.floor(
      Math.random() * 1000
    )}/1200/800) no-repeat center center / cover`,
    height: "100%",
    textAlign: "center"
  },
  showcase_text: {
    fontSize: "3rem",
    width: "100%",
    color: "white",
    marginBottom: "1.5rem",
    fontWeight: 400
  }
};

class MainPage extends Component {
  state = {
    email: "",
    password: "",
    loading: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.props.history.push("/game");
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { login } = this.props;
    const { email, password } = this.state;

    login(email, password);
  };

  toRegister = () => {
    this.props.history.push("/register");
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <Wrapper>
        <Left id="left">
          <div style={styles.login}>
            <div id="logo" style={styles.logo}>
              <img style={styles.logo_img} src={Logo} alt="SnekIO" />
            </div>
            <form onSubmit={this.onSubmit} style={styles.form}>
              <div>
                <label htmlFor="Email" style={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={this.state.email}
                  onChange={this.onChange}
                  style={styles.text_input}
                />
              </div>
              <div>
                <label htmlFor="Password" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={this.state.password}
                  onChange={this.onChange}
                  style={styles.text_input}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
              />
            </form>
            <div className="links" style={{ width: "60%" }}>
              <a href="/" style={styles.link}>
                Forgot Password
              </a>
            </div>
            <div style={styles.or}>
              <hr style={styles.bar} />
              <span style={styles.span}>OR</span>
              <hr style={styles.bar} />
            </div>
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ width: "60%" }}
              onClick={this.toRegister}
            >
              Create An Account
            </button>
          </div>
          <footer style={styles.footer}>
            <p>Copyright &copy; 2019, SnekIO All Rights Reserved</p>
            <div>
              <a
                style={styles.footer_link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://fontys.nl/Cookieverklaring/Cookieverklaring.htm"
              >
                Terms of use
              </a>{" "}
              |{" "}
              <a
                style={styles.footer_link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://fontys.nl/Over-Fontys/Wie-zijn-wij/Onze-organisatieNieuw/Regelingen-statuten-en-reglementen/Privacyverklaring-Fontys-Hogescholen.htm"
              >
                Privacy Policy
              </a>
            </div>
          </footer>
        </Left>
        <Right id="right">
          <div style={styles.showcase}>
            <div className="showcase-content">
              <h1 style={styles.showcase_text}>
                <strong>Snek</strong>IO
              </h1>
              <a
                href="/play-for-free"
                className="btn btn-outline-secondary"
                style={{ color: "white", width: "60%" }}
              >
                Start Playing For FREE Today!
              </a>
            </div>
          </div>
        </Right>
      </Wrapper>
    );
  }
}

MainPage.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(MainPage);
