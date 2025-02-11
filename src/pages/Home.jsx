import '../styles/home.css';
import greenIcon from '../images/green.png';
import redIcon from '../images/red.png';
import Navbar from './Navbar';

const Home = () => {

    return (
        <div>
            <Navbar />
            <div className="grid-container">
                <div className="box">
                    <h2>Get CGPA Analysis</h2>
                    <div id="container">
                        <form>
                            <label htmlFor="new">Enter name: </label>
                            <input
                                type="text"
                                id="new"
                            />
                        </form>
                    </div>
                    <p>Please note this is only for the 296 TE CE students in 2024.</p>
                    <p style={{ marginTop: '-12px' }}>Waiting for next year's results...</p>
                </div>

                <div className="box">
                    <h2>Gender Statistics</h2>
                    <p>A girl is more likely to have a higher CGPA</p>
                    <p>Girls have an avg CGPA of 7.87 and boys at 7.17</p>
                    <p>Gender Ratio</p>
                    <p>
                        <span style={{ fontWeight: 'bold' }}>A</span> {"->"} 47:13 
                        <span style={{ fontWeight: 'bold' }}> B</span> {"->"} 43:17
                        <span style={{ fontWeight: 'bold' }}> C</span> {"->"} 42:18
                        <span style={{ fontWeight: 'bold' }}> D</span> {"->"} 42:18
                        <span style={{ fontWeight: 'bold' }}> E</span> {"->"} 40:15
                        for every 60 rows
                        </p>
                </div>

                <div className="box">
                    <h2>2024 Leaderboard</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { rank: 1, name: 'NIHARIKA RAHUL KAMAT', cgpa: 9.99, icon: greenIcon },
                                { rank: 2, name: 'TALELE ROHIT RAHUL', cgpa: 9.96, icon: greenIcon },
                                { rank: 3, name: 'KORGAONKAR NEERAV JAIDEEP', cgpa: 9.92, icon: greenIcon },
                                { rank: 4, name: 'SUNIDHISHREE PRABAKARAN', cgpa: 9.89, icon: greenIcon },
                                { rank: 5, name: 'CHAKRABORTY SAIKAT TARUN', cgpa: 9.88, icon: redIcon },
                                { rank: 5, name: 'ADITYA ANIL BHABAL', cgpa: 9.88, icon: greenIcon },
                                { rank: 7, name: 'BHAMRE ARYA PRAVIN', cgpa: 9.87, icon: redIcon },
                                { rank: 8, name: 'ANKIT CHAUDHARY', cgpa: 9.86, icon: greenIcon },
                                { rank: 9, name: 'MOKSH JAIN', cgpa: 9.84, icon: redIcon },
                                { rank: 10, name: 'PATIL MANISH GIRISH', cgpa: 9.81, icon: greenIcon },
                                { rank: 10, name: 'SAANVI GANAPATI NETALKAR', cgpa: 9.81, icon: redIcon },
                                { rank: 12, name: 'YAHYA MOOSA', cgpa: 9.79, icon: greenIcon },
                                { rank: 12, name: 'ROHIT KUMAR', cgpa: 9.79, icon: redIcon },
                                { rank: 14, name: 'SUPRITHA YOGESH ANCHAN', cgpa: 9.78, icon: greenIcon },
                                { rank: 15, name: 'DHANDARPHALE SHARDUL SHRIPAD', cgpa: 9.76, icon: greenIcon },
                            ].map((student, index) => (
                                <tr key={index}>
                                    <td>{student.rank}</td>
                                    <td>
                                        {student.name}
                                        <img src={student.icon} alt="icon" style={{ width: 16, height: 16, marginLeft: 5 }} />
                                    </td>
                                    <td>{student.cgpa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="box">
                    <h2>Highest CGPA Increases</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Sem 3</th>
                                <th>Sem 4</th>
                                <th>++</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'PATEL JAYANT', sem3: 7.64, sem4: 8.50, increase: '8.6%' },
                                { name: 'DADHEKAR TANVI', sem3: 5.98, sem4: 6.84, increase: '8.6%' },
                                { name: 'PRAGYA MISHRA', sem3: 6.48, sem4: 7.22, increase: '7.4%' },
                                { name: 'THAKARE RUSHABH', sem3: 6.68, sem4: 7.41, increase: '7.3%' },
                                { name: 'KADAM SARVESH SUNIL', sem3: 7.13, sem4: 7.81, increase: '6.8%' },
                                { name: 'SHAIKH DANISH ASLAM', sem3: 7.82, sem4: 8.50, increase: '6.8%' },
                                { name: 'RAGHAV RAM DAD', sem3: 6.92, sem4: 7.55, increase: '6.3%' },
                                { name: 'OM SALIL DIDOLKAR', sem3: 7.44, sem4: 8.01, increase: '5.7%' },
                                { name: 'DEEPTANSHU LAL', sem3: 7.43, sem4: 7.98, increase: '5.5%' },
                                { name: 'MURDANDE ARNAV', sem3: 6.69, sem4: 7.23, increase: '5.4%' },
                                { name: 'ASHUTOSH YOGESH KULKARNI', sem3: 6.72, sem4: 7.24, increase: '5.2%' },
                            ].map((student, index) => (
                                <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.sem3}</td>
                                    <td>{student.sem4}</td>
                                    <td>{student.increase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="box">
                    <h2>THE TOUGHEST SUBJECTS</h2>
                    <p>The toughest subject with a deadly average rate of D is Basic Electronics and Logic Design from SEM III</p>
                    <p>Reason: Massive deviation from sample papers + In one of the 10 mark questions ESE, students were asked to design a MOD 5 counter which takes a lot of time... a MOD counter question is usually expected to be of max 3</p>
                    <p>Surprisingly, the subject Data Analysis and Algorithms in SEM IV which is known for being easy was the deadliest subject</p>
                    <p>This was due to the absence of numericals and a demonstration being asked for every algorithm meaning you had to make your own data, solve it, and also provide theory for it in ESE</p>
                </div>

                <div className="box">
                    <p>... More coming, just wait for the latest Git push to prod</p>
                    <img src="https://pbs.twimg.com/media/FuFVSYdXsAAKZh8?format=jpg&name=large" alt="coming soon" height="270" width="300" />

                </div>
            </div>
        </div>
    );
};

export default Home;