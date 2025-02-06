import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemText, ListItemButton, Divider, Collapse, Typography } from '@mui/material';
import {
    ShoppingCartRounded as ShoppingCartIcon,
    BarChartRounded as BarChartIcon,
    DescriptionRounded as DescriptionIcon,
    ExpandLessRounded as ExpandLessIcon,
    ExpandMoreRounded as ExpandMoreIcon,
    PersonRounded as PersonRoundedIcon,
    AddCircleRounded as AddCircleIcon,
    ListRounded as ListIcon,
    CategoryRounded as CategoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('xs')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const CustomDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const NAV_ITEMS = [
    { kind: 'header', title: 'Main Items' },
    {
        segment: 'users', title: 'Users Management', icon: <PersonRoundedIcon />,
        children: [
            { segment: 'users', title: 'Users List', icon: <ListIcon /> },
            { segment: 'users/pending', title: 'Pending Users', icon: <CategoryIcon /> },
        ],
    },
    { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Products' },
    {
        segment: 'products', title: 'Products Management', icon: <DescriptionIcon />,
        children: [
            { segment: 'products', title: 'Product List', icon: <ListIcon /> },
            { segment: 'products/add', title: 'Add Product', icon: <AddCircleIcon /> },
            { segment: 'categories', title: 'Categories', icon: <CategoryIcon /> },
        ],
    },
    { kind: 'divider' },
    { kind: 'header', title: 'Reports' },
    {
        segment: 'reports', title: 'Reports', icon: <BarChartIcon />,
        children: [
            { segment: 'sales', title: 'Sales Reports', icon: <DescriptionIcon /> },
            { segment: 'traffic', title: 'Traffic Reports', icon: <DescriptionIcon /> },
        ],
    },
];

export default function AdminDrawer({ open, onToggleDrawer}) {
    const [openReports, setOpenReports] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const navigate = useNavigate();

    const handleClickReports = () => {
        setOpenReports(!openReports);
        if (!open) {
            onToggleDrawer(true);
        }
    };

    const handleClickProducts = () => {
        setOpenProducts(!openProducts);
        if (!open) {
            onToggleDrawer(true);
        }
    };

    const handleClickUsers = () => {
        setOpenUsers(!openUsers);
        if (!open) {
            onToggleDrawer(true);
        }
    };

    useEffect(() => {
        if (!open) {
            setOpenReports(false);
            setOpenProducts(false);
            setOpenUsers(false);
        }
    }, [open]);

    return (
        <CustomDrawer variant="permanent" open={open} PaperProps={{
            style: {
                background: 'linear-gradient(180deg, rgb(25, 118, 210), #003366)',
                color: '#ffffff',
            },
          }}>
            <List sx={{ marginTop: 8 }}>
                {NAV_ITEMS.map((item, index) => {
                    if (item.kind === 'header') {
                        return (
                            <ListItem key={index}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: open ? 'block' : 'none' }}>
                                    {item.title}
                                </Typography>
                            </ListItem>
                        );
                    }
                    if (item.kind === 'divider') {
                        return <Divider key={index} />;
                    }

                    const hasChildren = item.children && item.children.length > 0;

                    return (
                        <React.Fragment key={index}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton onClick={() => {
                                    if (item.segment === 'reports') {
                                        handleClickReports();
                                    } else if (item.segment === 'products') {
                                        handleClickProducts();
                                    } else if (item.segment === 'users') {
                                        handleClickUsers();
                                    } else {
                                        navigate(`/admin/${item.segment}`);
                                    }
                                }}>
                                    {item.icon}
                                    <ListItemText primary={item.title} sx={{ display: open ? 'block' : 'none' }} />
                                    {hasChildren ? (item.segment === 'reports' ? (openReports ? <ExpandLessIcon /> : <ExpandMoreIcon />) : (item.segment === 'products' ? (openProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />) : (openUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />))) : null}
                                </ListItemButton>
                            </ListItem>
                            {hasChildren && (
                                <Collapse in={item.segment === 'reports' ? openReports : item.segment === 'products' ? openProducts : item.segment === 'users' ? openUsers : false} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.children.map((subItem, subIndex) => (
                                            <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                                                <ListItemButton onClick={() => navigate(`/admin/${subItem.segment}`)}>
                                                    {subItem.icon}
                                                    <ListItemText primary={subItem.title} sx={{ display: open ? 'block' : 'none' }} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    );
                })}
                <Divider />
            </List>
        </CustomDrawer>
    );
}
