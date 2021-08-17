// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Layout } from 'antd';

import { isPublic } from 'utils/enviroment';

import consts from 'consts';

function FooterDrawer(): JSX.Element {
    const { Footer } = Layout;
    const { INTEL_TERMS_OF_USE_URL, INTEL_COOKIES_URL, INTEL_PRIVACY_URL } = consts;

    return (
        <>
            {isPublic() && (
                <Footer style={{ textAlign: 'center', borderTop: '1px solid #e8e8e8' }}>
                    © Intel Corporation |
                    <a target='_blank' rel='noopener noreferrer' href={INTEL_TERMS_OF_USE_URL}>
                        {' '}
                        Terms of Use
                        {' '}
                    </a>
                    |
                    <a target='_blank' rel='noopener noreferrer' href={INTEL_COOKIES_URL}>
                        {' '}
                        Cookies
                        {' '}
                    </a>
                    |
                    <a target='_blank' rel='noopener noreferrer' href={INTEL_PRIVACY_URL}>
                        {' '}
                        Privacy
                        {' '}
                    </a>
                </Footer>
            )}
        </>
    );
}

export default FooterDrawer;