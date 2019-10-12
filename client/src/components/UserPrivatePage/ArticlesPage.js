import React, {useEffect} from 'react';
import Container from './Container';

const ArticlesPage = ({user, loadUserArticles, articles}) => {
    console.log(user);
    useEffect(() => {
        if(articles.length === 0) {
            loadUserArticles(user.user_id);
        }
    }, []);
    console.log(articles);

    return (
        <Container>
            {articles.length > 0 ?
               ( <>
                {articles.map(article => (
                    <div>
                        <h3>{article.title}</h3>
                        <div><a href={article.url} >{article.url}</a></div>
                    </div>
                )
                )}
               </>) : <h3>You have no articles yet</h3>
            }
        </Container>
    )
};

export default ArticlesPage;