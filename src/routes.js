const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "tim-icons icon-chart-pie-36"
    },
    {
        path: "/configuration",
        name: "Configuration",
        icon: "tim-icons icon-settings"
    },
    {
        collapse: true,
        name: "Integrations",
        icon: "tim-icons icon-components",
        state: "componentsCollapse",
        views: [
            /* {
                collapse: true,
                name: "Multi Level Collapse",
                mini: "MLT",
                state: "multiCollapse",
                views: [
                    {
                        path: "/buttons",
                        name: "Buttons",
                        mini: "B",
                        component: Buttons,
                        layout: "/admin"
                    }
                ]
            }, */
            {
                path: "/integrations",
                name: "Manage",
                mini: "M"
            },
            {
                path: "/integrations/add",
                name: "Add New",
                mini: "+"
            }
        ]
    }
];

export default routes;
