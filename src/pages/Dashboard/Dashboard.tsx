import { SingleSelect, Table } from '@medly-components/core';
import React, { useEffect, useState } from 'react';
import { FilterContainer, StyledForm } from './dashboard.styled';
import { Props } from './types';
import { options } from './utils';

interface itemTypes {
    date_of_joining: string;
    designation: string;
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    place: string;
}

export const Dashboard: React.SFC<Props> = ({ isLoading }) => {
    const [value, setValue] = useState<string>('name');
    const [userData, setUserData] = useState<itemTypes[]>([]);
    const [filteredData, setFilteredData] = useState<itemTypes[]>([]);

    const addValue = (value: string) => {
        setValue(value);
    };

    const searchData = (query: string) => {
        const data = filteredData.filter((item: itemTypes | any) => {
            return item[value].startsWith(query);
        });
        setFilteredData(data);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        const addedData = JSON.parse(localStorage.getItem('addedData'));
        if (addedData) {
            const isDataPresent = data.includes((item: itemTypes) => item.email === addedData.email);
            if (!isDataPresent) {
                const copyData = [...data];
                copyData.unshift(addedData);
                const updatedData = copyData.slice(0, 10);
                setUserData(copyData);
                setFilteredData(copyData);
                localStorage.removeItem('addedData');
            }
        } else {
            setUserData(data);
            setFilteredData(data);
        }
    }, []);

    return (
        <div>
            <FilterContainer>
                <SingleSelect options={options} value={value} label="Select" onChange={value => addValue(value)} />
                <StyledForm
                    actionSchema={{
                        actions: [
                            {
                                edges: 'rounded',
                                label: 'Search',
                                type: 'submit'
                            }
                        ],
                        alignItems: 'right'
                    }}
                    disabled={false}
                    fieldSchema={{
                        search: {
                            gridColumn: '1/7',
                            label: 'Search',
                            required: true,
                            type: 'text'
                        }
                    }}
                    fullWidth={false}
                    hideActions={false}
                    initialState={{}}
                    minWidth="50rem"
                    onSubmit={(data: Record<string, any>) => searchData(data.search)}
                />
            </FilterContainer>

            <Table
                columns={[
                    {
                        field: 'first_name',
                        fitContent: false,
                        fraction: 2,
                        sortable: true,
                        title: 'Name'
                    },
                    {
                        align: 'right',
                        field: 'place',
                        sortable: true,
                        title: 'Place'
                    },
                    {
                        field: 'email',
                        sortable: true,
                        title: 'Email'
                    },
                    {
                        align: 'right',
                        field: 'designation',
                        sortable: true,
                        title: 'Designation'
                    }
                ]}
                data={filteredData}
                defaultActivePage={1}
                itemsPerPage={10}
                onPageChange={({ activePage, sortField, sortOrder }) => {
                    console.log('clicked for pagination');
                    console.log(activePage);
                    // const upperIndex = activePage * 10;
                    // const lowerIndex = upperIndex - 10;
                    // const data = filteredData.slice(lowerIndex, upperIndex);
                    // setFilteredData(data);
                }}
                size="M"
                totalItems={userData.length}
                withPagination={true}
                onSort={() => ''}
                isLoading={isLoading}
            />
        </div>
    );
};
