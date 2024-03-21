import { Layout, Spin } from 'antd';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import useComponentContext from '../../context/component-context';

const AppLayout = () => {
    const { loading } = useComponentContext()

    if (loading) {
        return <Spin fullscreen />
    }

    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSidebar />
                <AppContent />
            </Layout>
        </Layout>
    )
}
 
export default AppLayout;