import React, { useState } from 'react';
import { StreamApp } from '../context';
export var WithExampleStreamApp = function (_a) {
    var children = _a.children;
    return (React.createElement(StreamApp, { apiKey: "fpwesm5u2evu", appId: "64527", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg" }, children));
};
export var notificationGroup1 = {
    activities: [
        {
            // @ts-expect-error
            actor: { data: { name: 'Jacky Davidson', profileImage: 'https://randomuser.me/api/portraits/men/72.jpg' } },
            verb: 'like',
            object: {
                verb: 'post',
                attachments: {
                    files: [],
                    images: [
                        'https://stream-cloud-uploads.imgix.net/images/41814/a5db2d18-1803-4300-906f-579af270edf1.3356358479_a0e3ee8a05_b.jpg?s=65db066cf45ee7895529725a8d478c14',
                    ],
                },
                object: 'https://stream-cloud-uploads.imgix.net/images/41814/a5db2d18-1803-4300-906f-579af270edf1.3356358479_a0e3ee8a05_b.jpg?s=65db066cf45ee7895529725a8d478c14',
                actor: { data: { name: 'Josh' } },
            },
            time: '2021-04-13T07:40:37.975Z',
        },
    ],
};
export var notificationGroup2 = {
    activities: [
        {
            // @ts-expect-error
            actor: { data: { name: 'Jordan Belfair', profileImage: 'https://randomuser.me/api/portraits/women/72.jpg' } },
            verb: 'follow',
            object: {},
            time: '2021-04-11T07:40:37.975Z',
        },
        {
            // @ts-expect-error
            actor: { data: { name: 'Jacky Davidson', profileImage: 'https://randomuser.me/api/portraits/men/72.jpg' } },
            verb: 'follow',
            object: {},
        },
        {
            // @ts-expect-error
            actor: { data: { name: 'Jared Fault', profileImage: 'https://randomuser.me/api/portraits/women/7.jpg' } },
            verb: 'follow',
            object: {},
        },
    ],
};
export var resolveAfter = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };
export var StatefulComponent = function (_a) {
    var children = _a.children, initialValue = _a.initialValue;
    var _b = useState(initialValue), state = _b[0], setState = _b[1];
    return children({ state: state, setState: setState });
};
//# sourceMappingURL=docz.js.map