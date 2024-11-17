import { Navigation } from './components/Navigation';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './routes/Home';
import { NotFound } from './routes/404';
import * as React from 'react';
import { Editor } from './routes/Editor';
import { ShowCard } from './routes/ShowCard';
import { AuthProvider } from './providers/AuthProvider';
import { MyCards } from './routes/MyCards';
import { AuthOnly } from './components/protection/AuthOnly';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navigation />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/editor/:paramId?" element={<Editor />} />
                    <Route path="/cards/:paramId" element={<ShowCard />} />
                    <Route path="/my-codes" element={<MyCards />} />
                    implement my codes site
                    <Route path="/404" element={<NotFound />} />
                    <Route path="/*" element={<Navigate to="/404" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
