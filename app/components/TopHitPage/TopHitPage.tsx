
import { Header } from '../Header/Header'
import { NewsComponent } from '../NewsComponent/NewsComponent'
import { ReusableTable } from '../ReusableTable/Reusable'
import { Search } from '../Search/Search'
import './TopHitPage.scss'

export const TopHitPage = () => {

    return (
        <div className='contentOfHit'>
            <div className='headerMover'>
                <Header imgName='rightArrow'/>
            </div>
            <NewsComponent title='Top Hit  Of the week' count={'999'} />
            <Header imgName='rightArrow'/>
            <NewsComponent title='Top Hit  Of the week' count={"99"} />
            <div className='contentOfSongs'>
                <Search />
                <ReusableTable />
            </div>
        </div>
    )
}