
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, Palette, Type, Sparkles } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  year: number;
  semester: number;
  examDay: string;
  examTime: string;
}

const subjects: Subject[] = [
  // السنة الأولى - الفصل الأول (6 مواد)
  { id: '1-1-1', name: 'مادة 1', year: 1, semester: 1, examDay: 'الأحد', examTime: '9:00-11:30' },
  { id: '1-1-2', name: 'مادة 2', year: 1, semester: 1, examDay: 'الاثنين', examTime: '9:00-11:30' },
  { id: '1-1-3', name: 'مادة 3', year: 1, semester: 1, examDay: 'الثلاثاء', examTime: '9:00-11:30' },
  { id: '1-1-4', name: 'مادة 4', year: 1, semester: 1, examDay: 'الأربعاء', examTime: '9:00-11:30' },
  { id: '1-1-5', name: 'مادة 5', year: 1, semester: 1, examDay: 'الخميس', examTime: '9:00-11:30' },
  { id: '1-1-6', name: 'مادة 6', year: 1, semester: 1, examDay: 'السبت', examTime: '9:00-11:30' },
  
  // السنة الأولى - الفصل الثاني (7 مواد)
  { id: '1-2-1', name: 'مادة 7', year: 1, semester: 2, examDay: 'الأحد', examTime: '1:00-3:30' },
  { id: '1-2-2', name: 'مادة 8', year: 1, semester: 2, examDay: 'الاثنين', examTime: '1:00-3:30' },
  { id: '1-2-3', name: 'مادة 9', year: 1, semester: 2, examDay: 'الثلاثاء', examTime: '1:00-3:30' },
  { id: '1-2-4', name: 'مادة 10', year: 1, semester: 2, examDay: 'الأربعاء', examTime: '1:00-3:30' },
  { id: '1-2-5', name: 'مادة 11', year: 1, semester: 2, examDay: 'الخميس', examTime: '1:00-3:30' },
  { id: '1-2-6', name: 'مادة 12', year: 1, semester: 2, examDay: 'السبت', examTime: '1:00-3:30' },
  { id: '1-2-7', name: 'مادة 13', year: 1, semester: 2, examDay: 'الأحد', examTime: '10:30-1:00' },

  // السنة الثانية - الفصل الأول (7 مواد)
  { id: '2-1-1', name: 'مادة 14', year: 2, semester: 1, examDay: 'الاثنين', examTime: '10:30-1:00' },
  { id: '2-1-2', name: 'مادة 15', year: 2, semester: 1, examDay: 'الثلاثاء', examTime: '10:30-1:00' },
  { id: '2-1-3', name: 'مادة 16', year: 2, semester: 1, examDay: 'الأربعاء', examTime: '10:30-1:00' },
  { id: '2-1-4', name: 'مادة 17', year: 2, semester: 1, examDay: 'الخميس', examTime: '10:30-1:00' },
  { id: '2-1-5', name: 'مادة 18', year: 2, semester: 1, examDay: 'السبت', examTime: '10:30-1:00' },
  { id: '2-1-6', name: 'مادة 19', year: 2, semester: 1, examDay: 'الأحد', examTime: '3:30-6:00' },
  { id: '2-1-7', name: 'مادة 20', year: 2, semester: 1, examDay: 'الاثنين', examTime: '3:30-6:00' },

  // السنة الثانية - الفصل الثاني (7 مواد)
  { id: '2-2-1', name: 'مادة 21', year: 2, semester: 2, examDay: 'الثلاثاء', examTime: '3:30-6:00' },
  { id: '2-2-2', name: 'مادة 22', year: 2, semester: 2, examDay: 'الأربعاء', examTime: '3:30-6:00' },
  { id: '2-2-3', name: 'مادة 23', year: 2, semester: 2, examDay: 'الخميس', examTime: '3:30-6:00' },
  { id: '2-2-4', name: 'مادة 24', year: 2, semester: 2, examDay: 'السبت', examTime: '3:30-6:00' },
  { id: '2-2-5', name: 'مادة 25', year: 2, semester: 2, examDay: 'الأحد', examTime: '11:00-1:30' },
  { id: '2-2-6', name: 'مادة 26', year: 2, semester: 2, examDay: 'الاثنين', examTime: '11:00-1:30' },
  { id: '2-2-7', name: 'مادة 27', year: 2, semester: 2, examDay: 'الثلاثاء', examTime: '11:00-1:30' },

  // السنة الثالثة - الفصل الأول (7 مواد)
  { id: '3-1-1', name: 'مادة 28', year: 3, semester: 1, examDay: 'الأربعاء', examTime: '11:00-1:30' },
  { id: '3-1-2', name: 'مادة 29', year: 3, semester: 1, examDay: 'الخميس', examTime: '11:00-1:30' },
  { id: '3-1-3', name: 'مادة 30', year: 3, semester: 1, examDay: 'السبت', examTime: '11:00-1:30' },
  { id: '3-1-4', name: 'مادة 31', year: 3, semester: 1, examDay: 'الأحد', examTime: '9:00-11:30' },
  { id: '3-1-5', name: 'مادة 32', year: 3, semester: 1, examDay: 'الاثنين', examTime: '9:00-11:30' },
  { id: '3-1-6', name: 'مادة 33', year: 3, semester: 1, examDay: 'الثلاثاء', examTime: '9:00-11:30' },
  { id: '3-1-7', name: 'مادة 34', year: 3, semester: 1, examDay: 'الأربعاء', examTime: '9:00-11:30' },

  // السنة الثالثة - الفصل الثاني (7 مواد)
  { id: '3-2-1', name: 'مادة 35', year: 3, semester: 2, examDay: 'الخميس', examTime: '9:00-11:30' },
  { id: '3-2-2', name: 'مادة 36', year: 3, semester: 2, examDay: 'السبت', examTime: '9:00-11:30' },
  { id: '3-2-3', name: 'مادة 37', year: 3, semester: 2, examDay: 'الأحد', examTime: '1:00-3:30' },
  { id: '3-2-4', name: 'مادة 38', year: 3, semester: 2, examDay: 'الاثنين', examTime: '1:00-3:30' },
  { id: '3-2-5', name: 'مادة 39', year: 3, semester: 2, examDay: 'الثلاثاء', examTime: '1:00-3:30' },
  { id: '3-2-6', name: 'مادة 40', year: 3, semester: 2, examDay: 'الأربعاء', examTime: '1:00-3:30' },
  { id: '3-2-7', name: 'مادة 41', year: 3, semester: 2, examDay: 'الخميس', examTime: '1:00-3:30' },

  // السنة الرابعة - الفصل الأول (9 مواد)
  { id: '4-1-1', name: 'مادة 42', year: 4, semester: 1, examDay: 'السبت', examTime: '1:00-3:30' },
  { id: '4-1-2', name: 'مادة 43', year: 4, semester: 1, examDay: 'الأحد', examTime: '10:30-1:00' },
  { id: '4-1-3', name: 'مادة 44', year: 4, semester: 1, examDay: 'الاثنين', examTime: '10:30-1:00' },
  { id: '4-1-4', name: 'مادة 45', year: 4, semester: 1, examDay: 'الثلاثاء', examTime: '10:30-1:00' },
  { id: '4-1-5', name: 'مادة 46', year: 4, semester: 1, examDay: 'الأربعاء', examTime: '10:30-1:00' },
  { id: '4-1-6', name: 'مادة 47', year: 4, semester: 1, examDay: 'الخميس', examTime: '10:30-1:00' },
  { id: '4-1-7', name: 'مادة 48', year: 4, semester: 1, examDay: 'السبت', examTime: '10:30-1:00' },
  { id: '4-1-8', name: 'مادة 49', year: 4, semester: 1, examDay: 'الأحد', examTime: '3:30-6:00' },
  { id: '4-1-9', name: 'مادة 50', year: 4, semester: 1, examDay: 'الاثنين', examTime: '3:30-6:00' },

  // السنة الرابعة - الفصل الثاني (8 مواد)
  { id: '4-2-1', name: 'مادة 51', year: 4, semester: 2, examDay: 'الثلاثاء', examTime: '3:30-6:00' },
  { id: '4-2-2', name: 'مادة 52', year: 4, semester: 2, examDay: 'الأربعاء', examTime: '3:30-6:00' },
  { id: '4-2-3', name: 'مادة 53', year: 4, semester: 2, examDay: 'الخميس', examTime: '3:30-6:00' },
  { id: '4-2-4', name: 'مادة 54', year: 4, semester: 2, examDay: 'السبت', examTime: '3:30-6:00' },
  { id: '4-2-5', name: 'مادة 55', year: 4, semester: 2, examDay: 'الأحد', examTime: '11:00-1:30' },
  { id: '4-2-6', name: 'مادة 56', year: 4, semester: 2, examDay: 'الاثنين', examTime: '11:00-1:30' },
  { id: '4-2-7', name: 'مادة 57', year: 4, semester: 2, examDay: 'الثلاثاء', examTime: '11:00-1:30' },
  { id: '4-2-8', name: 'مادة 58', year: 4, semester: 2, examDay: 'الأربعاء', examTime: '11:00-1:30' },

  // السنة الخامسة - الفصل الأول (8 مواد)
  { id: '5-1-1', name: 'مادة 59', year: 5, semester: 1, examDay: 'الخميس', examTime: '11:00-1:30' },
  { id: '5-1-2', name: 'مادة 60', year: 5, semester: 1, examDay: 'السبت', examTime: '11:00-1:30' },
  { id: '5-1-3', name: 'مادة 61', year: 5, semester: 1, examDay: 'الأحد', examTime: '9:00-11:30' },
  { id: '5-1-4', name: 'مادة 62', year: 5, semester: 1, examDay: 'الاثنين', examTime: '9:00-11:30' },
  { id: '5-1-5', name: 'مادة 63', year: 5, semester: 1, examDay: 'الثلاثاء', examTime: '9:00-11:30' },
  { id: '5-1-6', name: 'مادة 64', year: 5, semester: 1, examDay: 'الأربعاء', examTime: '9:00-11:30' },
  { id: '5-1-7', name: 'مادة 65', year: 5, semester: 1, examDay: 'الخميس', examTime: '9:00-11:30' },
  { id: '5-1-8', name: 'مادة 66', year: 5, semester: 1, examDay: 'السبت', examTime: '9:00-11:30' },

  // السنة الخامسة - الفصل الثاني (5 مواد)
  { id: '5-2-1', name: 'مادة 67', year: 5, semester: 2, examDay: 'الأحد', examTime: '1:00-3:30' },
  { id: '5-2-2', name: 'مادة 68', year: 5, semester: 2, examDay: 'الاثنين', examTime: '1:00-3:30' },
  { id: '5-2-3', name: 'مادة 69', year: 5, semester: 2, examDay: 'الثلاثاء', examTime: '1:00-3:30' },
  { id: '5-2-4', name: 'مادة 70', year: 5, semester: 2, examDay: 'الأربعاء', examTime: '1:00-3:30' },
  { id: '5-2-5', name: 'مادة 71', year: 5, semester: 2, examDay: 'الخميس', examTime: '1:00-3:30' },
];

const Index = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [tableFormat, setTableFormat] = useState<string>('day-subject');
  const [textFormat, setTextFormat] = useState<string>('regular');
  const [tableColor, setTableColor] = useState<string>('blue');
  const [includeMotivation, setIncludeMotivation] = useState<boolean>(false);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSelectAllSemester = (year: number, semester: number) => {
    const semesterSubjects = subjects
      .filter(s => s.year === year && s.semester === semester)
      .map(s => s.id);
    
    const allSelected = semesterSubjects.every(id => selectedSubjects.includes(id));
    
    if (allSelected) {
      setSelectedSubjects(prev => prev.filter(id => !semesterSubjects.includes(id)));
    } else {
      setSelectedSubjects(prev => [...new Set([...prev, ...semesterSubjects])]);
    }
  };

  const getSubjectsBySemester = (year: number, semester: number) => {
    return subjects.filter(s => s.year === year && s.semester === semester);
  };

  const generateTable = () => {
    const selectedSubjectData = subjects.filter(s => selectedSubjects.includes(s.id));
    
    if (selectedSubjectData.length === 0) {
      alert('يرجى اختيار مادة واحدة على الأقل');
      return;
    }

    // Create a new window for the table
    const newWindow = window.open('', '_blank');
    if (!newWindow) return;

    const tableHtml = createTableHTML(selectedSubjectData);
    newWindow.document.write(tableHtml);
    newWindow.document.close();
  };

  const createTableHTML = (selectedSubjectData: Subject[]) => {
    const colorMap = {
      purple: '#8B5CF6',
      black: '#000000',
      pink: '#EC4899',
      blue: '#3B82F6',
      green: '#10B981',
      red: '#EF4444'
    };

    const fontWeightMap = {
      regular: '400',
      light: '300',
      bold: '700',
      semibold: '600',
      extralight: '200'
    };

    const motivationalQuotes = [
      'بالتوفيق في امتحاناتك! 🌟',
      'النجاح ثمرة الجهد والمثابرة 💪',
      'اجتهد اليوم لتحصد النجاح غداً 🎓',
      'كل خطوة تخطوها تقربك من هدفك 🚀',
      'الثقة بالنفس أول خطوات النجاح ✨'
    ];

    const motivationPhrase = includeMotivation 
      ? motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
      : '';

    let tableContent = '';

    if (tableFormat === 'day-subject') {
      // Group by day
      const groupedByDay: { [key: string]: Subject[] } = {};
      selectedSubjectData.forEach(subject => {
        if (!groupedByDay[subject.examDay]) {
          groupedByDay[subject.examDay] = [];
        }
        groupedByDay[subject.examDay].push(subject);
      });

      tableContent = `
        <table style="width: 100%; border-collapse: collapse; font-family: 'Cairo', Arial, sans-serif; font-weight: ${fontWeightMap[textFormat as keyof typeof fontWeightMap]};">
          <thead>
            <tr style="background-color: ${colorMap[tableColor as keyof typeof colorMap]}; color: white;">
              <th style="border: 2px solid #333; padding: 12px; text-align: center;">اليوم</th>
              <th style="border: 2px solid #333; padding: 12px; text-align: center;">المادة</th>
              <th style="border: 2px solid #333; padding: 12px; text-align: center;">الوقت</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(groupedByDay).map(([day, daySubjects]) => 
              daySubjects.map((subject, index) => `
                <tr style="background-color: ${index % 2 === 0 ? '#f8f9fa' : 'white'};">
                  ${index === 0 ? `<td style="border: 2px solid #333; padding: 12px; text-align: center; vertical-align: middle;" rowspan="${daySubjects.length}">${day}</td>` : ''}
                  <td style="border: 2px solid #333; padding: 12px; text-align: center;">${subject.name}</td>
                  <td style="border: 2px solid #333; padding: 12px; text-align: center;">${subject.examTime}</td>
                </tr>
              `).join('')
            ).join('')}
          </tbody>
        </table>
      `;
    } else {
      // Group by day and time
      const groupedByDayTime: { [key: string]: { [key: string]: Subject[] } } = {};
      selectedSubjectData.forEach(subject => {
        if (!groupedByDayTime[subject.examDay]) {
          groupedByDayTime[subject.examDay] = {};
        }
        if (!groupedByDayTime[subject.examDay][subject.examTime]) {
          groupedByDayTime[subject.examDay][subject.examTime] = [];
        }
        groupedByDayTime[subject.examDay][subject.examTime].push(subject);
      });

      tableContent = `
        <table style="width: 100%; border-collapse: collapse; font-family: 'Cairo', Arial, sans-serif; font-weight: ${fontWeightMap[textFormat as keyof typeof fontWeightMap]};">
          <thead>
            <tr style="background-color: ${colorMap[tableColor as keyof typeof colorMap]}; color: white;">
              <th style="border: 2px solid #333; padding: 12px; text-align: center;">اليوم</th>
              <th style="border: 2px solid #333; padding: 12px; text-align: center;">الوقت</th>
              <th style="border: 2px solid #333; padding: 12px; text-align: center;">المواد</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(groupedByDayTime).map(([day, timeGroups]) => 
              Object.entries(timeGroups).map(([time, timeSubjects], timeIndex) => `
                <tr style="background-color: ${timeIndex % 2 === 0 ? '#f8f9fa' : 'white'};">
                  ${timeIndex === 0 ? `<td style="border: 2px solid #333; padding: 12px; text-align: center; vertical-align: middle;" rowspan="${Object.keys(timeGroups).length}">${day}</td>` : ''}
                  <td style="border: 2px solid #333; padding: 12px; text-align: center;">${time}</td>
                  <td style="border: 2px solid #333; padding: 12px; text-align: center;">${timeSubjects.map(s => s.name).join(', ')}</td>
                </tr>
              `).join('')
            ).join('')}
          </tbody>
        </table>
      `;
    }

    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>جدول الامتحانات</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Cairo', Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
            direction: rtl;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: ${colorMap[tableColor as keyof typeof colorMap]};
            margin-bottom: 10px;
            font-size: 2.5em;
          }
          .motivation {
            background: linear-gradient(135deg, ${colorMap[tableColor as keyof typeof colorMap]}, ${colorMap[tableColor as keyof typeof colorMap]}aa);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            font-size: 1.2em;
            font-weight: 600;
          }
          @media print {
            body { margin: 0; background: white; }
            .container { box-shadow: none; margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>جدول الامتحانات</h1>
            <p style="color: #666; font-size: 1.1em;">عدد المواد المختارة: ${selectedSubjectData.length}</p>
          </div>
          ${motivationPhrase ? `<div class="motivation">${motivationPhrase}</div>` : ''}
          ${tableContent}
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">مولد جداول الامتحانات</h1>
          </div>
          <p className="text-xl text-gray-600">أهلاً وسهلاً! اختر موادك واحصل على جدول امتحاناتك المخصص</p>
        </div>

        {/* Subject Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              اختيار المواد الدراسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {[1, 2, 3, 4, 5].map(year => (
                <div key={year} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4 text-center text-blue-800">
                    السنة {year === 1 ? 'الأولى' : year === 2 ? 'الثانية' : year === 3 ? 'الثالثة' : year === 4 ? 'الرابعة' : 'الخامسة'}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2].map(semester => {
                      const semesterSubjects = getSubjectsBySemester(year, semester);
                      const selectedInSemester = semesterSubjects.filter(s => selectedSubjects.includes(s.id)).length;
                      const allSelected = semesterSubjects.length > 0 && selectedInSemester === semesterSubjects.length;
                      
                      return (
                        <div key={semester} className="border rounded-lg p-3 bg-white">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-700">
                              الفصل {semester === 1 ? 'الأول' : 'الثاني'} ({semesterSubjects.length} مواد)
                            </h4>
                            <Button
                              variant={allSelected ? "destructive" : "default"}
                              size="sm"
                              onClick={() => handleSelectAllSemester(year, semester)}
                            >
                              {allSelected ? 'إلغاء الكل' : 'تحديد الكل'}
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {semesterSubjects.map(subject => (
                              <div key={subject.id} className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox
                                  id={subject.id}
                                  checked={selectedSubjects.includes(subject.id)}
                                  onCheckedChange={() => handleSubjectToggle(subject.id)}
                                />
                                <Label htmlFor={subject.id} className="text-sm cursor-pointer">
                                  {subject.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                          
                          {selectedInSemester > 0 && (
                            <Badge variant="secondary" className="mt-2">
                              محدد: {selectedInSemester} من {semesterSubjects.length}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
              <span className="text-lg font-semibold text-blue-800">
                إجمالي المواد المختارة: {selectedSubjects.length}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Table Format Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              تنسيق الجدول
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={tableFormat} onValueChange={setTableFormat}>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="day-subject" id="day-subject" />
                <Label htmlFor="day-subject">يوم - مادة</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="day-hour" id="day-hour" />
                <Label htmlFor="day-hour">يوم - ساعة</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Text Format and Color */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                نوع الخط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={textFormat} onValueChange={setTextFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">عادي</SelectItem>
                  <SelectItem value="light">خفيف</SelectItem>
                  <SelectItem value="bold">عريض</SelectItem>
                  <SelectItem value="semibold">شبه عريض</SelectItem>
                  <SelectItem value="extralight">خفيف جداً</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                لون الجدول
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={tableColor} onValueChange={setTableColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purple">بنفسجي</SelectItem>
                  <SelectItem value="black">أسود</SelectItem>
                  <SelectItem value="pink">وردي</SelectItem>
                  <SelectItem value="blue">أزرق</SelectItem>
                  <SelectItem value="green">أخضر</SelectItem>
                  <SelectItem value="red">أحمر</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Motivation Option */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              عبارة تحفيزية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="motivation"
                checked={includeMotivation}
                onCheckedChange={setIncludeMotivation}
              />
              <Label htmlFor="motivation">إضافة عبارة تحفيزية للجدول</Label>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center">
          <Button 
            onClick={generateTable}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transform transition hover:scale-105"
            disabled={selectedSubjects.length === 0}
          >
            <Calendar className="h-5 w-5 ml-2" />
            إنشاء جدول الامتحانات
          </Button>
          
          {selectedSubjects.length === 0 && (
            <p className="text-red-500 mt-2">يرجى اختيار مادة واحدة على الأقل</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
