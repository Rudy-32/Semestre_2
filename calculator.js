document.addEventListener('DOMContentLoaded', () => {
    const modules = [
        {
            name: 'Mathématiques Avancées',
            subjects: [
                { name: 'Traitement de signal', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Mathématiques 2', type: 'normal', coefficient: 1.5, credits: 2 }
            ]
        },
        {
            name: 'Physique',
            subjects: [
                { name: 'Propagation des ondes électromagnétiques', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Atelier fondamentaux pour les télécoms', type: 'tp', coefficient: 0.5, credits: 1 },
                { name: 'Optique géométrique', type: 'normal', coefficient: 1, credits: 2 }
            ]
        },
        {
            name: 'Fondamentaux de Réseaux et Communications',
            subjects: [
                { name: 'Atelier communications', type: 'tp', coefficient: 0.5, credits: 1 },
                { name: 'Théorie de la communication', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Réseaux: architecture et fonctions', type: 'normal', coefficient: 1, credits: 2 }
            ]
        },
        {
            name: 'Programmation Avancée',
            subjects: [
                { name: 'Base de données', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Programmation orientée objet', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Atelier programmation système', type: 'tp', coefficient: 0.5, credits: 1 }
            ]
        },
        {
            name: 'Électronique de base',
            subjects: [
                { name: 'Électronique analogique et composants', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Électronique numérique', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Atelier électronique 2', type: 'tp', coefficient: 0.5, credits: 1 }
            ]
        },
        {
            name: 'Transversale 2',
            subjects: [
                { name: 'Droit et NTIC', type: 'normal', coefficient: 0.5, credits: 1 },
                { name: 'General English', type: 'normal', coefficient: 1, credits: 2 },
                { name: 'Techniques de rédaction', type: 'normal', coefficient: 1, credits: 2 }
            ]
        }
    ];

    const modulesContainer = document.getElementById('modules-container');

    const renderTable = () => {
        modulesContainer.innerHTML = '';
        modules.forEach((module, moduleIndex) => {
            module.subjects.forEach((subject, subjectIndex) => {
                const row = document.createElement('tr');

                if (subjectIndex === 0) {
                    const moduleCell = document.createElement('td');
                    moduleCell.className = 'px-4 py-2 border';
                    moduleCell.rowSpan = module.subjects.length;
                    moduleCell.textContent = module.name;
                    row.appendChild(moduleCell);
                }

                const subjectCell = document.createElement('td');
                subjectCell.className = 'px-4 py-2 border';
                subjectCell.textContent = subject.name;
                row.appendChild(subjectCell);

                const dsCell = document.createElement('td');
                dsCell.className = 'px-4 py-2 border';
                if (subject.type === 'normal') {
                    const dsInput = document.createElement('input');
                    dsInput.type = 'number';
                    dsInput.className = 'ds-input w-full';
                    dsInput.id = `ds-${module.name}-${subject.name}`;
                    dsInput.min = 0;
                    dsInput.max = 20;
                    dsInput.addEventListener('input', () => calculateAverages());
                    dsCell.appendChild(dsInput);
                } else {
                    dsCell.textContent = '-';
                    dsCell.style.backgroundColor = '#f0f0f0';
                }
                row.appendChild(dsCell);

                const examCell = document.createElement('td');
                examCell.className = 'px-4 py-2 border';
                if (subject.type === 'normal') {
                    const examInput = document.createElement('input');
                    examInput.type = 'number';
                    examInput.className = 'exam-input w-full';
                    examInput.id = `exam-${module.name}-${subject.name}`;
                    examInput.min = 0;
                    examInput.max = 20;
                    examInput.addEventListener('input', () => calculateAverages());
                    examCell.appendChild(examInput);
                } else {
                    examCell.textContent = '-';
                    examCell.style.backgroundColor = '#f0f0f0';
                }
                row.appendChild(examCell);

                const moyenneCell = document.createElement('td');
                moyenneCell.className = 'px-4 py-2 border moyenne-cell';
                moyenneCell.innerHTML = subject.type === 'normal' ? '-' : `<input type="number" class="tp-input w-full" id="tp-${module.name}-${subject.name}" min="0" max="20">`;
                row.appendChild(moyenneCell);

                if (subjectIndex === 0) {
                    const moduleAvgCell = document.createElement('td');
                    moduleAvgCell.className = 'px-4 py-2 border module-avg';
                    moduleAvgCell.rowSpan = module.subjects.length;
                    moduleAvgCell.textContent = '-';
                    row.appendChild(moduleAvgCell);

                    const creditsCell = document.createElement('td');
                    creditsCell.className = 'px-4 py-2 border credits';
                    creditsCell.rowSpan = module.subjects.length;
                    creditsCell.textContent = '-';
                    row.appendChild(creditsCell);
                }

                modulesContainer.appendChild(row);
            });
        });
    };

    const calculateAverages = () => {
        let totalCredits = 0;
        let totalWeightedAvg = 0;

        modules.forEach((module, moduleIndex) => {
            let moduleSum = 0;
            let moduleCoefficientSum = 0;
            let moduleCredits = 0;

            module.subjects.forEach((subject, subjectIndex) => {
                const dsInput = document.getElementById(`ds-${module.name}-${subject.name}`);
                const examInput = document.getElementById(`exam-${module.name}-${subject.name}`);
                const tpInput = document.getElementById(`tp-${module.name}-${subject.name}`);

                let subjectAverage;
                if (subject.type === 'normal') {
                    const ds = parseFloat(dsInput.value) || 0;
                    const exam = parseFloat(examInput.value) || 0;
                    subjectAverage = ds * 0.4 + exam * 0.6;
                } else {
                    subjectAverage = parseFloat(tpInput.value) || 0;
                }

                moduleSum += subjectAverage * subject.coefficient;
                moduleCoefficientSum += subject.coefficient;

                if (subjectAverage >= 10) {
                    moduleCredits += subject.credits;
                }
            });

            const moduleAverage = moduleSum / moduleCoefficientSum;
            const moduleAvgCell = document.querySelectorAll('.module-avg')[moduleIndex];
            const creditsCell = document.querySelectorAll('.credits')[moduleIndex];

            moduleAvgCell.textContent = moduleAverage.toFixed(2);
            if (moduleAverage >= 10) {
                creditsCell.textContent = module.subjects.reduce((sum, subj) => sum + subj.credits, 0);
                totalCredits += module.subjects.reduce((sum, subj) => sum + subj.credits, 0);
            } else {
                creditsCell.textContent = moduleCredits;
                totalCredits += moduleCredits;
            }

            totalWeightedAvg += moduleAverage * moduleCoefficientSum;
        });

        const finalAverage = totalWeightedAvg / modules.reduce((sum, module) => sum + module.subjects.reduce((subSum, subj) => subSum + subj.coefficient, 0), 0);
        document.getElementById('final-average').textContent = finalAverage.toFixed(2);
        document.getElementById('total-credits').textContent = totalCredits;
    };

    const exportGrades = () => {
        const data = JSON.stringify(modules.map(module => ({
            name: module.name,
            subjects: module.subjects.map(subject => ({
                name: subject.name,
                type: subject.type,
                coefficient: subject.coefficient,
                credits: subject.credits,
                ds: document.getElementById(`ds-${module.name}-${subject.name}`).value,
                exam: document.getElementById(`exam-${module.name}-${subject.name}`).value,
                tp: document.getElementById(`tp-${module.name}-${subject.name}`).value
            }))
        })));

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grades.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const importGrades = () => {
        const fileInput = document.getElementById('import-json');
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const data = JSON.parse(reader.result);
                data.forEach(moduleData => {
                    const module = modules.find(m => m.name === moduleData.name);
                    moduleData.subjects.forEach(subjectData => {
                        const subject = module.subjects.find(s => s.name === subjectData.name);
                        if (subject) {
                            document.getElementById(`ds-${module.name}-${subject.name}`).value = subjectData.ds || '';
                            document.getElementById(`exam-${module.name}-${subject.name}`).value = subjectData.exam || '';
                            document.getElementById(`tp-${module.name}-${subject.name}`).value = subjectData.tp || '';
                        }
                    });
                });
                calculateAverages();
            };
            reader.readAsText(file);
        });
        fileInput.click();
    };

    renderTable();

    document.getElementById('export-json').addEventListener('click', exportGrades);
    document.getElementById('import-json-btn').addEventListener('click', importGrades);

    calculateAverages();
});
