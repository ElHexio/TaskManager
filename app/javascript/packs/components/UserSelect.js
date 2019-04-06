import React, { Component } from 'react';
import AsyncPaginate from 'react-select-async-paginate';
import { fetch } from '../utils/Fetch';


export default class UserSelect extends Component {
  state = {
    inputValue: '',
  }

  getOptionLabel = (option) => {
    let { first_name, last_name } = option;
    let fullName = `${first_name} ${last_name}`;
    return fullName;
  }

  getOptionValue = (option) => {
    return option.id
  }

  loadOptions = (search, loadedOptions, { page, per_page }) => {
    let users_url = Routes.api_v1_users_path({
      q: {
        first_name_or_last_name_cont: search
      },
      page,
      per_page,
      format: 'json'
    });

    return fetch('GET', users_url)
      .then(({data}) => {
        let { current_page, total_pages } = data.meta;
        let hasMore = current_page < total_pages;
        return {
          options: data.items,
          hasMore,
          additional: {
            page: hasMore ? page + 1 : page,
            per_page
          },
        };
      });
  }

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  }

  render() {
    return (
      <div>
        <AsyncPaginate
          cacheOptions
          value={this.props.value}
          loadOptions={this.loadOptions}
          debounceTimeout={500}
          defaultOptions
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={this.props.isDisabled}
          onChange={this.props.onChange}
          additional={{
            page: 1,
            per_page: 10,
          }}
        />
      </div>
    );
  }
}
