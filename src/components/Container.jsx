import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import $ from 'jquery';


const StyledContainer = styled.div`
  padding: 20px;
  height: 100%;

  .error {
    color: red;
  }
`;

export default class Container extends React.Component {
  state = {
    friend: null,
    errorMessage: '',
    spinner: false,
  }

  fetchFriendWithNativeFetch = () => {
    // turn spinner on
    this.setState({ spinner: true });

    fetch('http://localhost:3000/api/friends/2')
      .then(response => {
        return response.json();
      })
      .then(parsedData => {
        // happy path
        this.setState({ friend: parsedData });
      })
      .catch(error => {
        // unhappy path
        this.setState({ errorMessage: error.message });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  }

  fetchFriendWithAxios = () => {
    // turn spinner on
    this.setState({ spinner: true });

    axios.get('http://localhost:3000/api/friends/2')
      .then(response => {
        this.setState({ friend: response.data });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  }

  fetchFriendWithAxiosUsingAsyncAwaitSyntax = async () => {
    // turn spinner on
    this.setState({ spinner: true });
    try {
      const axiosData = await axios.get('http://localhost:3000/api/friends/2');
      this.setState({ friend: axiosData.data });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ spinner: false });
    }
  }

  fetchFriendWithJQuery = () => {
    $.ajax({
      url: 'http://localhost:3000/api/friends/3',
      success: response => {
        this.setState({ friend: response });
      },
      error: error => {
        this.setState({ errorMessage: error.statusText });
      },
    });
  }

  componentDidMount() {
    this.fetchFriendWithAxiosUsingAsyncAwaitSyntax();
  }

  render() {
    return (
      <StyledContainer>
        {
          this.state.errorMessage &&
          <div className='error'>{this.state.errorMessage}</div>
        }

        {
          this.state.spinner &&
          <div className='loading'>Loading friends...</div>
        }

        {
          this.state.friend &&
          <div>{this.state.friend.name}</div>
        }
      </StyledContainer>
    );
  }
}
